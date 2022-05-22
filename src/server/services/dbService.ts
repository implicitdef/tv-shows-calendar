import knex, { QueryInterface } from 'knex'
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
    const userRows = await knexToPromise<User[]>(
      trx
        .select()
        .where({
          google_user_id: googleUserId,
        })
        .from('users'),
    )
    if (userRows.length) {
      return userRows[0].id
    }
    const rowsOfIds = await knexToPromise<number[]>(
      trx
        .insert({
          google_user_id: googleUserId,
        })
        .into('users')
        .returning('id'),
    )
    if (rowsOfIds.length !== 1) {
      throw new Error(
        `${rowsOfIds.length} rows were created by the saveUser query`,
      )
    }
    const newUserId = rowsOfIds[0]
    // the new user needs to subscribe to all the default shows
    // TODO essayer de faire un promise.all et voir si ça tient bien. Si non, extraire ce reduce pour que ce soit plus limpide
    await Conf.defaultShowsIds.reduce(async (previousPromise, serieId) => {
      await previousPromise
      return doAddSerieToUser(trx, newUserId, serieId)
    }, Promise.resolve())
    return newUserId
  })
}

export async function addSerieToUser(
  userId: number,
  serieId: number,
): Promise<void> {
  doAddSerieToUser(knexClient, userId, serieId)
}

export async function removeSerieFromUser(
  userId: number,
  serieId: string,
): Promise<void> {
  return knexToPromise<void>(
    knexClient
      .del()
      .where({
        user_id: userId,
        serie_id: serieId,
      })
      .from('users_series'),
  )
}
export async function getSeriesOfUser(userId: number): Promise<number[]> {
  const rows = await knexToPromise<UserSerieRow[]>(
    knexClient
      .select()
      .from('users_series')
      .where({
        user_id: userId,
      })
      .orderBy('serie_id', 'asc'),
  )
  return rows.map(row => row.serie_id)
}

export async function pushData(data: string): Promise<void> {
  return await knexToPromise<void>(
    knexClient.insert({ content: data }).into('raw_json_data'),
  )
}

async function doAddSerieToUser(
  knx: QueryInterface,
  userId: number,
  serieId: number,
): Promise<void> {
  try {
    await knexToPromise<unknown>(
      knx
        .insert({
          user_id: userId,
          serie_id: serieId,
        })
        .into('users_series'),
    )
  } catch (err) {
    // swallow duplicate key constraint
    if (err.code !== '23505') {
      throw err
    }
  }
}
