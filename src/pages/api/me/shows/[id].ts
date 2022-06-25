import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnectedUserId } from '../../../../client.auth'
import { getDb } from '../../../../server.db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | {
              message: string
          }
        | { error: string }
    >,
) {
    const userId = getConnectedUserId(req)
    const serieId = req.query.id
    // TODO faudra mutualiser ça quand même
    if (!serieId || typeof serieId !== 'string') {
        throw new Error('Missing id parameter')
    }
    switch (req.method) {
        case 'POST': {
            await getDb()
                .insertInto('users_series')
                .values({
                    // TODO mutualiser les parseInt aussi
                    user_id: parseInt(userId, 10),
                    serie_id: parseInt(serieId, 10),
                })
                .onConflict((oc) => oc.doNothing())
                .execute()
            res.json({ message: 'Done' })
            break
        }
        case 'DELETE': {
            await getDb()
                .deleteFrom('users_series')
                .where('user_id', '=', parseInt(userId, 10))
                .where('serie_id', '=', parseInt(serieId, 10))
                .execute()
            res.json({ message: 'Done' })
            break
            break
        }
        default:
            // TODO faudra mutualiser ça quand même
            res.status(404).send({ error: 'not found' })
    }
}
