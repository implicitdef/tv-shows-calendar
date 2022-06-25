import { NextApiResponse } from 'next'

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



