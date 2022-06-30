import Head from 'next/head'
import React, { ReactNode, useEffect } from 'react'
import { TopBar } from './meta/TopBar'

export function Layout({
    userEmail,
    children,
}: {
    children: ReactNode
    userEmail: string | null
}) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="crossOrigin"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="page">
                <TopBar {...{ userEmail }} />
                {children}
            </div>
        </>
    )
}
