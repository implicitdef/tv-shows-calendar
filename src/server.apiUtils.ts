import { NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from './server.conf'

export type MyNextApiResponse = NextApiResponse<{ message: string }>

export function sendError(
    res: MyNextApiResponse,
    status: number,
    message: string,
) {
    return res.status(status).json({ message })
}

export function sendOk(res: MyNextApiResponse) {
    return res.status(200).json({ message: 'ok' })
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

export function verifyJWT(token: string): { userId: number } | 'invalid' {
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        return { userId: (payload as any).sub as number }
    } catch (err) {
        return 'invalid'
    }
}
