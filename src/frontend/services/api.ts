import * as axios from 'axios'
import moment, { Moment } from 'moment'
import { getAxios, Wirings } from 'tv/frontend/services/axiosConfig'
import * as cache from 'tv/frontend/services/cache'
import * as conf from 'tv/frontend/services/conf'
import { Show, Season } from 'tv/shared/domain'

const base = conf.serverUrl

function extractData(response: axios.AxiosResponse): any {
  return response.data
}

export function allShows(wirings: Wirings): Promise<Show[]> {
  return cache.cached('all-shows', () => {
    return getAxios(wirings)
      .get(`${base}/shows`)
      .then(extractData)
  })
}

export function searchShows(wirings: Wirings, q: string): Promise<Show[]> {
  return cache.cached('all-shows-' + q, () => {
    return getAxios(wirings)
      .get(`${base}/shows`, { params: { q } })
      .then(extractData)
  })
}

export function seasonsOfShow(
  wirings: Wirings,
  showId: number,
): Promise<Season<Moment>[]> {
  return cache.cached(`seasons-of-${showId}`, () => {
    return getAxios(wirings)
      .get(`${base}/shows/${showId}/seasons`)
      .then(extractData)
      .then((data: Season<string>[]) => {
        return data.map(season => {
          return {
            ...season,
            time: {
              start: moment(season.time.start),
              end: moment(season.time.end),
            },
          }
        })
      })
  })
}

export function userShows(wirings: Wirings): Promise<Show[]> {
  return getAxios(wirings)
    .get(`${base}/me/shows`)
    .then()
    .then(extractData)
}

export function defaultShows(wirings: Wirings): Promise<Show[]> {
  return cache.cached('default-shows', () => {
    return getAxios(wirings)
      .get(`${base}/shows/default`)
      .then()
      .then(extractData)
  })
}

export async function followShow(wirings: Wirings, id: number): Promise<void> {
  try {
    await getAxios(wirings).post(`${base}/me/shows/${id}`)
  } catch (err) {
    const e: axios.AxiosError = err
    // we tolerate the conflict
    // so we can follow something we followed already
    if (!e.response || e.response.status !== 409) {
      throw e
    }
  }
}

export async function unfollowShow(
  wirings: Wirings,
  id: number,
): Promise<void> {
  await getAxios(wirings).delete(`${base}/me/shows/${id}`)
}
