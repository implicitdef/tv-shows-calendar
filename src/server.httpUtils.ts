import { NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from './server.conf'
import { IncomingHttpHeaders, IncomingMessage } from 'http'

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
            if (typeof email === 'string' && typeof password === 'string') {
                return { email, password }
            }
        } catch (err) {}
    }
    return 'invalid'
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

function parseAuthorizationHeader(req: IncomingMessage): string | null {
    const authorization = req.headers.authorization || ''
    const prefix = 'Bearer '
    if (authorization.startsWith(prefix)) {
        return authorization.substring(prefix.length)
    }
    return null
}

export function getUserId(req: IncomingMessage): number | null {
    const token = parseAuthorizationHeader(req)
    if (token) {
        const result = verifyJWT(token)
        if (result !== 'invalid') {
            return result.userId
        }
    }
    return null
}
