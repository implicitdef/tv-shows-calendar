import type { NextApiRequest } from 'next'
import {
    MyApiResponse,
    parseEmailPasswordBody,
    sendError,
    sendOk,
    setJWTCookieInResponse,
} from '../../server.httpUtils'
import { signIn } from '../../server.users'

export default async function handler(req: NextApiRequest, res: MyApiResponse) {
    if (req.method !== 'POST') {
        sendError(res, 404, 'not_found')
        return
    }
    const bodyParsed = parseEmailPasswordBody(req.body)
    if (bodyParsed === 'invalid') {
        sendError(res, 400, 'invalid_body')
        return
    }
    const result = await signIn(bodyParsed)
    if (result === 'wrong_email_or_password') {
        sendError(res, 401, 'wrong_email_or_password')
        return
    }
    setJWTCookieInResponse(res, result)
    sendOk(res)
}
