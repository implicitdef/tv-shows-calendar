import Link from 'next/link'
import * as React from 'react'
import SearchBox from './SearchBox'

export default function CalendarBar({
    year,
    showAddShowButton,
}: {
    year: number
    showAddShowButton: boolean
}) {
    const searchBoxOrNot = showAddShowButton ? <SearchBox /> : null
    return (
        <div className="calendar-bar">
            <div className="calendar-bar__searchbox">{searchBoxOrNot}</div>
            <div className="calendar-bar__nav">
                <Link href={`/${year - 1}`}>
                    <span className="calendar-bar__back">{'⬅️'}</span>
                </Link>
                <span className="calendar-bar__year">{year}</span>
                <Link href={`/${year + 1}`}>
                    <span className="calendar-bar__forward">{'➡️'}</span>
                </Link>
            </div>
        </div>
    )
}
