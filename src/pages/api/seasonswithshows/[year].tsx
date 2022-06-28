import type { NextApiRequest, NextApiResponse } from 'next'
import { loadSeasonsWithShow } from '../../../server.core'
import {
    readNumberFromRouteParamsOrQuery,
    readUserFromRequest,
    sendError,
} from '../../../server.httpUtils'
import { SeasonWithShow } from '../../../structs'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | {
              message: string
          }
        | {
              seasons: SeasonWithShow[]
          }
    >,
) {
    const user = await readUserFromRequest(req)
    const year = readNumberFromRouteParamsOrQuery(req.query, 'year')
    if (!user) {
        sendError(res, 401, 'not_logged_in')
        return
    }
    if (!year) {
        sendError(res, 400, 'missing_year_param')
        return
    }
    const seasons = await loadSeasonsWithShow(year, user.userId)
    res.status(200)
    res.json({ seasons })
}
