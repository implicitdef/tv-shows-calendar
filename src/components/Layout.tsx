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
        <div className="page">
            <TopBar {...{ userEmail }} />
            {children}
        </div>
    )
}
