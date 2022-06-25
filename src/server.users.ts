import { getDb } from './server.db'
import crypto from 'crypto'

function hash({ password, salt }: { password: string; salt: string }): string {
    return crypto
        .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        .toString('base64')
}

function generateSalt() {
    return crypto.randomBytes(128).toString('base64')
}

export async function signUp(
    email: string,
    password: string,
): Promise<'ok' | 'email_taken'> {
    const salt = generateSalt()
    const password_hash = hash({ salt, password })
    try {
        await getDb()
            .insertInto('users')
            .values({ email, password_hash, salt })
            .execute()
        return 'ok'
    } catch (err) {
        const errAny = err as any
        if (errAny.constraint && errAny.constraint === 'email_unique') {
            return 'email_taken'
        }
        throw err
    }
}

// Returns true if signed in
// Returns false if wrong email or password
export async function signIn(email: string, password: string) {
    const res = await getDb()
        .selectFrom('users')
        .select(['password_hash', 'salt'])
        .where('email', '=', email)
        .executeTakeFirst()
    if (res) {
        const { password_hash, salt } = res
        if (password_hash === hash({ password, salt })) {
            return 'ok'
        }
    }
    return 'wrong_email_or_password'
}
