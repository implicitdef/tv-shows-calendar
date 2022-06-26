import moment from 'moment'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import CalendarBar from '../components/calendar-bar/CalendarBar'
import CalendarCore from '../components/calendar-core/CalendarCore'
import { Layout } from '../components/Layout'
import { isTimeRangeInYear } from '../dateUtils'
import { DEFAULT_SHOWS_IDS, loadData } from '../server.core'
import { getDb } from '../server.db'
import {
    BasePageData,
    readNumberFromRouteParams,
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
    // TODO si user, aller chercher les bonnes données à afficher
    const year = readNumberFromRouteParams(params, 'year')
    if (!year) {
        return { notFound: true }
    }
    const fullData = await loadData()
    const showsIds = user
        ? (
              await getDb()
                  .selectFrom('users_series')
                  .select('serie_id')
                  .where('user_id', '=', user.userId)
                  .orderBy('serie_id', 'asc')
                  .execute()
          ).map((_) => _.serie_id)
        : DEFAULT_SHOWS_IDS

    const showsWithSeasons = fullData.filter((_) =>
        showsIds.includes(_.serie.id),
    )
    const seasons: SeasonWithShow[] = showsWithSeasons
        .flatMap(({ serie, seasons }) =>
            seasons.map((season) => ({ show: serie, ...season })),
        )
        .filter((_) => isTimeRangeInYear(_.time, year))
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
    seasons,
    now,
    userEmail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout {...{ userEmail }}>
            <CalendarBar {...{ year }} showAddShowButton={!!userEmail} />
            <CalendarCore
                {...{ year, seasons }}
                now={moment(now)}
                showRemoveButtons={!!userEmail}
            />
        </Layout>
    )
}

export default Page
