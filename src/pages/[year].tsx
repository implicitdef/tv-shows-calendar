import * as React from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import CalendarBar from '../components/calendar-bar/CalendarBar'
import CalendarCore from '../components/calendar-core/CalendarCore'
import { Layout } from '../components/Layout'
import { isTimeRangeInYear } from '../dateUtils'
import {
    DEFAULT_SHOWS_IDS,
    loadData,
    loadSeasonsWithShow,
} from '../server.core'
import { getDb } from '../server.db'
import {
    BasePageData,
    readNumberFromRouteParamsOrQuery,
    readUserFromRequest,
} from '../server.httpUtils'
import { SeasonWithShow } from '../structs'

type Data = BasePageData & {
    year: number
    seasons: SeasonWithShow[]
    now: string
}

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
    const { params, req } = context
    const user = await readUserFromRequest(req)
    const year = readNumberFromRouteParamsOrQuery(params, 'year')
    if (!year) {
        return { notFound: true }
    }
    const seasons = await loadSeasonsWithShow(year, user?.userId ?? null)
    return {
        props: {
            seasons,
            year,
            now: moment().toISOString(),
            userEmail: user && user.userEmail,
        },
    }
}

export function Page({
    year,
    seasons: _seasons,
    now,
    userEmail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [seasons, setSeasons] = useState(_seasons)

    async function refreshSeasons() {
        const response = await fetch(`./api/seasonswithshows/${year}`)
        if (!response.ok) {
            console.error('API error', response.status)
            return
        }
        const json = (await response.json()) as { seasons: SeasonWithShow[] }
        setSeasons(json.seasons)
    }

    useEffect(() => {
        // when navigating with the arrows
        // override the state with what's coming from the server
        setSeasons(_seasons)
    }, [_seasons])

    return (
        <Layout {...{ userEmail }}>
            <CalendarBar
                {...{ year, refreshSeasons }}
                showAddShowButton={!!userEmail}
            />
            <CalendarCore
                {...{ year, seasons, refreshSeasons }}
                now={moment(now)}
                showRemoveButtons={!!userEmail}
            />
        </Layout>
    )
}

export default Page
