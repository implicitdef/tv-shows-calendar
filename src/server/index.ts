import * as bodyParser from 'body-parser'
import * as express from 'express'
import 'source-map-support/register'
import * as Auth from 'tv/server/auth/auth'
import * as DbService from 'tv/server/services/dbService'
import * as Conf from 'tv/server/utils/conf'
import * as Web from 'tv/server/utils/web'

console.log(`Server started with process.env.NODE_ENV = `, process.env.NODE_ENV)

const app = express()

// Return all shows, optionally filtered by the search parameter 'q'
app.get('/shows', async (req, res, next) => {
  try {
    const data = await DbService.loadData()
    const series = data.map(serieAndSeasons => serieAndSeasons.serie)
    const seriesFiltered =
      req.query.q && typeof req.query.q === 'string'
        ? series.filter(serie =>
            serie.name.toLowerCase().includes(req.query.q.toLowerCase()),
          )
        : series
    res.json(seriesFiltered)
  } catch (err) {
    next(err)
  }
})

// Return a selection of shows for the unconnected user
app.get('/shows/default', async (_, res, next) => {
  try {
    const data = await DbService.loadData()
    const series = data.map(serieAndSeasons => serieAndSeasons.serie)
    const seriesFiltered = series.filter(serie =>
      Conf.defaultShowsIds.includes(serie.id),
    )
    res.json(seriesFiltered)
  } catch (err) {
    next(err)
  }
})

// Return all details about seasons of a show
app.get('/shows/:showId/seasons', async (req, res, next) => {
  try {
    const showId = req.params.showId
    const data = await DbService.loadData()
    const serieAndSeason = data.find(
      serieAndSeasons => String(serieAndSeasons.serie.id) === showId,
    )
    if (!serieAndSeason) {
      throw new Web.NotFoundError(`Serie ${showId} not found`)
    }
    res.json(serieAndSeason.seasons)
  } catch (err) {
    next(err)
  }
})

// Returns the shows of a user
app.get('/me/shows', Auth.middleware, async (req, res, next) => {
  try {
    const liReq = req as Auth.LoggedInRequest
    const seriesIds = await DbService.getSeriesOfUser(liReq.userId)
    const data = await DbService.loadData()
    const series = data.map(serieAndSeasons => serieAndSeasons.serie)
    const seriesFiltered = series.filter(serie => seriesIds.includes(serie.id))
    res.json(seriesFiltered)
  } catch (err) {
    next(err)
  }
})

// Add a serie to a user
app.post('/me/shows/:serieId', Auth.middleware, async (req, res, next) => {
  try {
    const liReq = req as Auth.LoggedInRequest
    await DbService.addSerieToUser(
      liReq.userId,
      parseInt(req.params.serieId, 10),
    )
    res.json({ message: 'Done' })
  } catch (err) {
    next(err)
  }
})

// Remove a serie from a user
app.delete('/me/shows/:serieId', Auth.middleware, async (req, res, next) => {
  try {
    const liReq = req as Auth.LoggedInRequest
    await DbService.removeSerieFromUser(
      liReq.userId,
      parseInt(req.params.serieId, 10),
    )
    res.json({ message: 'Done' })
  } catch (err) {
    next(err)
  }
})

// Overrides the underlying data (shows, seasons, etc.) in one big HTTP POST
// Actually will just inserts a new line in the DB, for safety
// but only the most recent row is ever read, so be careful, if you push to this
// you have to push ALL the data you need
// You have to send an api key in the param 'key'
app.post(
  '/data',
  bodyParser.text({ type: '*/*', limit: '50mb' }),
  async (req, res, next) => {
    try {
      if (req.query.key !== Conf.pushDataApiKey) {
        throw new Web.AuthError()
      }
      await DbService.pushData(req.body)
      res.json({ message: 'Done' })
    } catch (err) {
      next(err)
    }
  },
)

Web.finishExpressAppSetupAndLaunch(app)
