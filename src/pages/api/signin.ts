import type { NextApiRequest } from 'next'
import {
    generateJWT,
    MyApiResponse,
    parseEmailPasswordBody,
    sendError,
    sendOk,
} from '../../server.httpUtils'
import { signIn } from '../../server.users'

export default async function handler(req: NextApiRequest, res: MyApiResponse) {
    if (req.method !== 'POST') {
        return sendError(res, 404, 'not_found')
    }
    const bodyParsed = parseEmailPasswordBody(req.body)
    if (bodyParsed === 'invalid') {
        return sendError(res, 400, 'invalid_body')
    }
    const result = await signIn(bodyParsed)
    if (result === 'wrong_email_or_password') {
        return sendError(res, 401, 'wrong_email_or_password')
    }
    const _365DaysInSeconds = 365 * 24 * 60 * 60
    res.setHeader(
        'Set-Cookie',
        `jwt=${generateJWT(
            result,
        )}; Max-Age=${_365DaysInSeconds}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    )
    sendOk(res)
}
