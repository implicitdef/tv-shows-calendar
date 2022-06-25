import type { NextApiRequest } from 'next'
import {
    MyApiResponse,
    parseEmailPasswordBody,
    sendError,
    sendOk,
} from '../../server.httpUtils'
import { signUp } from '../../server.users'

export default async function handler(req: NextApiRequest, res: MyApiResponse) {
    if (req.method !== 'POST') {
        return sendError(res, 404, 'not found')
    }
    const bodyParsed = parseEmailPasswordBody(req.body)
    if (bodyParsed === 'invalid') {
        return sendError(res, 400, 'invalid body')
    }
    const result = await signUp(bodyParsed)
    if (result === 'email_taken') {
        return sendError(res, 400, 'email taken')
    }
    sendOk(res)
}
