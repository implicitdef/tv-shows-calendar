import moment from 'moment'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import CalendarBar from '../components/calendar-bar/CalendarBar'
import CalendarCore from '../components/calendar-core/CalendarCore'
import { Layout } from '../components/Layout'
import { isTimeRangeInYear } from '../dateUtils'
import { DEFAULT_SHOWS_IDS, loadData } from '../server.core'
import { getUserId } from '../server.httpUtils'
import { SeasonWithShow, Show } from '../structs'

type Data = { year: number; seasons: SeasonWithShow[]; now: string }

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
    const { params, req } = context
    const userId = getUserId(req)
    console.log('@@@ found userId : ', userId)
    // TODO si userid, aller chercher les bonnes données à afficher
    const { year: yearStr } = params || {}
    if (yearStr && typeof yearStr === 'string') {
        // TODO gérer si pas un number
        const year = parseInt(yearStr, 10)
        const defaultShowsWithSeasons = (await loadData()).filter((_) =>
            DEFAULT_SHOWS_IDS.includes(_.serie.id),
        )
        const seasons: SeasonWithShow[] = defaultShowsWithSeasons
            .flatMap(({ serie, seasons }) =>
                seasons.map((season) => ({ show: serie, ...season })),
            )
            .filter((_) => isTimeRangeInYear(_.time, year))
        return {
            props: {
                seasons,
                year,
                now: moment().toISOString(),
            },
        }
    }
    // TODO faire une not found ici (attention il parait que ça peut exploser les types ?)
    throw new Error('missing year parameter')
}

export function Page({
    year,
    seasons,
    now,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <CalendarBar {...{ year }} showAddShowButton={false} />
            <CalendarCore
                {...{ year, seasons }}
                now={moment(now)}
                showRemoveButtons={false}
            />
        </Layout>
    )
}

export default Page
