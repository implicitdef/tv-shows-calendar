export type EmailAndPassword = { email: string; password: string }

export async function callSignin(_: EmailAndPassword) {
    const res = await fetch('./api/signin', {
        method: 'post',
        body: JSON.stringify(_),
    })
    const message: string = (await res.json()).message
    if (res.ok) {
        return 'ok'
    } else if (message === 'wrong_email_or_password') {
        return message
    } else {
        throw new Error('API error ' + res.status + ' ' + message)
    }
}

export async function callSignup(_: EmailAndPassword) {
    const res = await fetch('./api/signup', {
        method: 'post',
        body: JSON.stringify(_),
    })
    const message: string = (await res.json()).message
    if (res.ok) {
        return 'ok'
    } else if (message === 'email_taken') {
        return message
    } else {
        throw new Error('API error ' + res.status + ' ' + message)
    }
}
