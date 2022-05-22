import knex from 'knex'
import * as DbQueries from 'tv/server/services/dbQueries'
import * as Conf from 'tv/server/utils/conf'
import { DataFromDb, ShowAndSeasons } from 'tv/shared/domain'
import { knexToPromise } from '../utils/utils'

type RawJsonDataRow = {
  id: number
  content: string
}
type User = {
  id: number
  google_user_id: string
}
type UserSerieRow = {
  user_id: number
  serie_id: number
}

const knexClient = knex({
  client: 'postgres',
  connection: Conf.db,
})

export async function loadData(): Promise<ShowAndSeasons[]> {
  const rows = await knexToPromise<RawJsonDataRow[]>(
    knexClient
      .select()
      .from('raw_json_data')
      .orderBy('creation_time', 'desc')
      .limit(1),
  )
  return JSON.parse(rows[0].content) as DataFromDb
}
export async function saveOrGetUser(googleUserId: string): Promise<number> {
  return knexClient.transaction(async trx => {
    const maybeUser = await DbQueries.getUserByGoogleUserId(trx, googleUserId)
    if (maybeUser) {
      return maybeUser.id
    }
    const newUserId = await DbQueries.saveUser(trx, googleUserId)
    await Conf.defaultShowsIds.reduce(async (previousPromise, serieId) => {
      await previousPromise
      return DbQueries.addSerieToUser(trx, newUserId, serieId)
    }, Promise.resolve())
    return newUserId
  })
}
export async function addSerieToUser(
  userId: number,
  serieId: string,
): Promise<void> {
  await DbQueries.addSerieToUser(knexClient, userId, parseInt(serieId, 10))
}
export async function removeSerieFromUser(
  userId: number,
  serieId: string,
): Promise<void> {
  return DbQueries.removeSerieFromUser(
    knexClient,
    userId,
    parseInt(serieId, 10),
  )
}
export async function getSeriesOfUser(userId: number): Promise<number[]> {
  return await DbQueries.getSeriesOfUser(knexClient, userId)
}

export async function pushData(data: string): Promise<void> {
  return DbQueries.pushData(knexClient, data)
}
