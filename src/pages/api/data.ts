import type { NextApiRequest, NextApiResponse } from 'next'
import { PUSH_DATA_API_KEY } from '../../server.conf'
import { getDb } from '../../server.db'
import { sendError } from '../../server.httpUtils'

type ExpectedDataFormat = {
    serie: {
        id: number
        name: string
    }
    seasons: {
        number: number
        time: {
            start: string
            end: string
        }
    }[]
}[]

// Overrides the underlying data (shows, seasons, etc.) in one big HTTP POST
// Actually will just inserts a new line in the DB, for safety
// but only the most recent row is ever read, so be careful, if you push to this
// you have to push ALL the data you need
// You have to send an api key in the param 'key'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | {
              message: string
          }
        | { error: string }
    >,
) {
    if (req.method === 'POST') {
        const { key } = req.query
        if (!key || typeof key !== 'string' || key !== PUSH_DATA_API_KEY) {
            sendError(res, 401, 'invalid key')
            return
        }
        const content = JSON.stringify(req.body as ExpectedDataFormat)
        console.log(
            `Inserting new data into the DB (length: ${
                content.length
            }) : ${content.substring(0, 30)}...`,
        )
        await getDb().insertInto('raw_json_data').values({ content }).execute()
        res.json({ message: 'Done' })
    } else {
        res.status(400).send({ error: 'wrong method' })
    }
}
