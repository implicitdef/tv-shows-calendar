import { NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from './server.conf'
import { IncomingMessage, ServerResponse } from 'http'
import cookie from 'cookie'
import { getEmailOf } from './server.users'
import { ParsedUrlQuery } from 'querystring'

export type MyApiResponse = NextApiResponse<{ message: string }>

export function sendError(res: MyApiResponse, status: number, message: string) {
    res.status(status)
    res.json({ message })
}

export function sendOk(res: MyApiResponse) {
    res.status(200)
    res.json({ message: 'ok' })
}

export function parseEmailPasswordBody(
    body: unknown,
): { email: string; password: string } | 'invalid' {
    if (typeof body === 'string') {
        try {
            const { email, password } = JSON.parse(body)
            if (
                typeof email === 'string' &&
                typeof password === 'string' &&
                password.length &&
                // TODO ici mettre une vraie regexp d'email
                /.*@gmail.com/.test(email)
            ) {
                return { email, password }
            }
        } catch (err) {}
    }
    return 'invalid'
}

export function readNumberFromRouteParams(
    params: ParsedUrlQuery | undefined = {},
    name: string,
): number | null {
    try {
        const str = params[name]
        if (typeof str !== 'string') {
            return null
        }
        return parseInt(str, 10)
    } catch {
        return null
    }
}

export function generateJWT(userId: number): string {
    return jwt.sign({ sub: userId }, JWT_SECRET)
}

function verifyJWT(token: string): { userId: number } | 'invalid' {
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        return { userId: (payload as any).sub as number }
    } catch (err) {
        return 'invalid'
    }
}

export async function readUserFromRequest(
    req: IncomingMessage,
): Promise<{ userId: number; userEmail: string } | null> {
    const { jwt } = cookie.parse(req.headers.cookie || '') as { jwt?: string }
    if (jwt) {
        const result = verifyJWT(jwt)
        if (result !== 'invalid') {
            const { userId } = result
            const userEmail = await getEmailOf(userId)
            return { userId, userEmail }
        }
    }
    return null
}

export function setJWTCookieInResponse(res: ServerResponse, userId: number) {
    const _365DaysInSeconds = 365 * 24 * 60 * 60
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', generateJWT(userId), {
            httpOnly: true,
            maxAge: _365DaysInSeconds,
            path: '/',
            secure: true,
            sameSite: 'strict',
        }),
    )
}

export function setDestructionOfJWTCookieInResponse(res: ServerResponse) {
    const _365DaysInSeconds = 365 * 24 * 60 * 60
    res.setHeader(
        // TODO find correct way to destroy the cookie
        'Set-Cookie',
        cookie.serialize('jwt', '', {
            httpOnly: true,
            maxAge: _365DaysInSeconds,
            path: '/',
            secure: true,
            sameSite: 'strict',
        }),
    )
}

export type BasePageData = { userEmail: string | null }
