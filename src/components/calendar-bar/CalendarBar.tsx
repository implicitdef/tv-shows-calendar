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
        <div className="calendar-bar row no-gutters">
            <div className="col-md-3 col-sm-6">{searchBoxOrNot}</div>
            <div className="calendar-bar__nav col-md-6 col-sm-6">
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
