import type { NextApiRequest, NextApiResponse } from 'next'
import { getDb } from '../../../../server.db'
import {
    readNumberFromQueryString,
    readUserFromRequest,
    sendError,
    sendOk,
} from '../../../../server.httpUtils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | {
              message: string
          }
        | { error: string }
    >,
) {
    const user = await readUserFromRequest(req)
    if (!user) {
        sendError(res, 401, 'wrong_email_or_password')
        return
    }
    const serieId = readNumberFromQueryString(req, 'id')
    if (serieId === null) {
        sendError(res, 400, 'missing_parameter')
        return
    }
    switch (req.method) {
        case 'POST': {
            await getDb()
                .insertInto('users_series')
                .values({
                    user_id: user.userId,
                    serie_id: serieId,
                })
                .onConflict((oc) => oc.doNothing())
                .execute()
            sendOk(res)
            break
        }
        case 'DELETE': {
            await getDb()
                .deleteFrom('users_series')
                .where('user_id', '=', user.userId)
                .where('serie_id', '=', serieId)
                .execute()
            sendOk(res)
            break
        }
        default:
            sendError(res, 404, 'not_found')
    }
}
