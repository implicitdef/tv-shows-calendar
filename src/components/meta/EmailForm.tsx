import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

export const EmailForm = ({
    onSubmit,
    type,
}: {
    onSubmit: (email: string) => Promise<void>
    type: 'signin' | 'confirm_email'
}) => {
    const [email, setEmail] = useState('')
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    return (
        <form
            className="email-form"
            onSubmit={async (e) => {
                e.preventDefault()
                setErrorMessage(null)
                setDisplaySuccess(false)
                try {
                    await onSubmit(email)
                    setDisplaySuccess(true)
                } catch (e) {
                    if (
                        type === 'signin' &&
                        e instanceof FirebaseError &&
                        e.code === 'auth/invalid-email'
                    ) {
                        setErrorMessage('Invalid email')
                    } else {
                        console.error(e)
                        setErrorMessage('Something went wrong, sorry')
                    }
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
            <p>
                {type === 'signin'
                    ? 'No password needed. We will send you an email with a link. You will have to click that link to prove that you own this email adress.'
                    : "You clicked the signin link from a different device or browser. That's ok, we just need you to type in the same email address just one more time to be sure."}
            </p>
        </form>
    )
}
