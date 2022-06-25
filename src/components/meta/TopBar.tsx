import React from 'react'
import Link from 'next/link'

export function TopBar() {
    const user = null
    return (
        <div className="auth-bar">
            <Link href="/">
                <a className="auth-bar__button">home</a>
            </Link>
            <Link href="/about">
                <a className="auth-bar__button">about</a>
            </Link>
            {!user && (
                <Link href="/signup">
                    <a className="auth-bar__button">sign up</a>
                </Link>
            )}
            {!user && (
                <Link href="/signin">
                    <a className="auth-bar__button">sign in</a>
                </Link>
            )}
            {user && (
                <>
                    <span>TODO@GMAIL.com</span>
                    <a className="auth-bar__button" onClick={() => {}}>
                        sign out
                    </a>
                </>
            )}
        </div>
    )
}
