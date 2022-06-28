import { Moment } from 'moment'
import * as React from 'react'
import { useState } from 'react'
import { SeasonWithShow } from '../../structs'
import Marker from './Marker'
import MonthsBackground from './MonthsBackground'
import MonthsNamesRow from './MonthsNamesRow'
import SeasonRow from './SeasonRow'

const CalendarCore: React.FC<{
    year: number
    now: Moment
    seasons: SeasonWithShow[]
    showRemoveButtons: boolean
    refreshSeasons: () => Promise<void>
}> = ({ year, seasons, now, showRemoveButtons, refreshSeasons }) => {
    const marker = now.year() === year ? <Marker now={now} /> : null

    async function removeShow(showId: number) {
        const response = await fetch(`./api/shows/${showId}/subscription`, {
            method: 'delete',
        })
        if (!response.ok) {
            console.error('API error', response.status)
            return
        }
        await refreshSeasons()
    }

    return (
        <div className="calendar-core">
            <div className="calendar-core__inner">
                {marker}
                <MonthsBackground year={year} />
                <MonthsNamesRow year={year} />
                {seasons.map((season, index) => {
                    return (
                        <SeasonRow
                            key={`${season.show.id}S${season.number}`}
                            index={index}
                            season={season}
                            year={year}
                            onClose={() => removeShow(season.show.id)}
                            showRemoveButtons={showRemoveButtons}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CalendarCore
