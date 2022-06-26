import type { NextApiRequest } from 'next'
import {
    MyApiResponse,
    parseEmailPasswordBody,
    sendError,
    sendOk,
    setJWTCookieInResponse,
} from '../../server.httpUtils'
import { signUp } from '../../server.users'

export default async function handler(req: NextApiRequest, res: MyApiResponse) {
    if (req.method !== 'POST') {
        sendError(res, 404, 'not found')
        return
    }
    const bodyParsed = parseEmailPasswordBody(req.body)
    if (bodyParsed === 'invalid') {
        sendError(res, 400, 'invalid body')
        return
    }
    const result = await signUp(bodyParsed)
    if (result === 'email_taken') {
        sendError(res, 400, 'email_taken')
        return
    }
    setJWTCookieInResponse(res, result)
    sendOk(res)
}
