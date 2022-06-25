import { useState } from 'react'
import { EmailAndPassword } from '../../client.api'

export const EmailForm = ({
    onSubmit,
    type,
}: {
    onSubmit: (
        _: EmailAndPassword,
    ) => Promise<'ok' | 'wrong_email_or_password' | 'email_taken'>
    type: 'signin' | 'signup'
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    return (
        <form
            className="email-form"
            onSubmit={async (e) => {
                e.preventDefault()
                setErrorMessage(null)
                setDisplaySuccess(false)
                const res = await onSubmit({ email, password })
                if (res === 'ok') {
                    setDisplaySuccess(true)
                } else if (res === 'wrong_email_or_password') {
                    setErrorMessage('Wrong email or password')
                } else {
                    setErrorMessage('Email already registered')
                }
            }}
        >
            <h1>
                {type == 'signin' ? 'Sign up / sign in' : 'Confirm your email'}
            </h1>

            <div>
                <input
                    value={email}
                    placeholder="Your email here"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    value={password}
                    placeholder="Your password here"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">OK</button>
            </div>
            {displaySuccess && (
                <p className="email-form__success">
                    {type === 'signin'
                        ? 'Email sent ! Click the link you received.'
                        : "OK, you'll be signed in shortly"}
                </p>
            )}
            {errorMessage && (
                <p className="email-form__error"> {errorMessage}</p>
            )}
        </form>
    )
}
