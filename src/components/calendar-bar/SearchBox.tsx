import * as React from 'react'
import { useState } from 'react'
import { Show } from '../../structs'

export default function SearchBox({
    refreshSeasons,
}: {
    refreshSeasons: () => Promise<void>
}) {
    const [shows, setShows] = useState<Show[]>([])
    const [open, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
    const onChange = async (input: string) => {
        setValue(input)
        if (!input.length) {
            setShows([])
            return
        }
        const response = await fetch(
            `./api/shows?q=${encodeURIComponent(input)}`,
        )
        if (!response.ok) {
            console.error('API error', response.status)
            setShows([])
            return
        }
        setShows((await response.json()) as Show[])
    }
    const onSubmit = async (show: Show) => {
        const response = await fetch(`./api/shows/${show.id}/subscription`, {
            method: 'post',
        })
        if (!response.ok) {
            console.error('API error', response.status)
            return
        }
        setIsOpen(false)
        setValue('')
        await refreshSeasons()
    }
    return (
        <div className="search-box">
            <input
                type="text"
                className="search-box__input"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                onFocus={() => setIsOpen(true)}
                placeholder="Add a TV show"
            />
            <div className="search-box__results">
                <ul className="search-box__results-inner">
                    {open &&
                        shows.slice(0, 10).map((show) => (
                            <li
                                key={show.id}
                                onClick={() => {
                                    onSubmit(show)
                                }}
                            >
                                {show.name}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
