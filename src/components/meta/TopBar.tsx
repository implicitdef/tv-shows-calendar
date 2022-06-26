import React from 'react'
import Link from 'next/link'

export function TopBar({ userEmail }: { userEmail: string | null }) {
    return (
        <div className="auth-bar">
            <Link href="/">
                <a className="auth-bar__button">home</a>
            </Link>
            <Link href="/about">
                <a className="auth-bar__button">about</a>
            </Link>
            {!userEmail && (
                <Link href="/signup">
                    <a className="auth-bar__button">sign up</a>
                </Link>
            )}
            {!userEmail && (
                <Link href="/signin">
                    <a className="auth-bar__button">sign in</a>
                </Link>
            )}
            {userEmail && (
                <>
                    <span>{userEmail}</span>
                    <Link href="/signout">
                        <a className="auth-bar__button" onClick={() => {}}>
                            sign out
                        </a>
                    </Link>
                </>
            )}
        </div>
    )
}
