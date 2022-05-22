import knex, { QueryInterface } from 'knex'
import * as Conf from 'tv/server/utils/conf'
import { DataFromDb, ShowAndSeasons } from 'tv/shared/domain'
import { knexToPromise } from '../utils/utils'

// TODO utiliser Typescript avec knex, regarder dans la doc, il y a une manière plus propre apparemment. Regarder s'ils ont pas un truc pour les promises aussi

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
  const [{ content }] = await knexToPromise<RawJsonDataRow[]>(
    knexClient
      .select()
      .from('raw_json_data')
      .orderBy('creation_time', 'desc')
      .limit(1),
  )
  return JSON.parse(content) as DataFromDb
}

export async function saveOrGetUser(google_user_id: string): Promise<number> {
  return knexClient.transaction(async trx => {
    const user = await knexToPromise<User>(
      trx
        .first()
        .where({ google_user_id })
        .from('users'),
    )
    if (user) {
      return user.id
    }
    const rowsOfIds = await knexToPromise<number[]>(
      trx
        .insert({ google_user_id })
        .into('users')
        .returning('id'),
    )
    if (rowsOfIds.length !== 1) {
      throw new Error(
        `${rowsOfIds.length} rows were created by the saveUser query`,
      )
    }
    const [newUserId] = rowsOfIds
    // the new user needs to subscribe to all the default shows
    // TODO inline la methode et le faire en un seul insert (insert multiple)
    await Promise.all(
      Conf.defaultShowsIds.map(showId =>
        doAddSerieToUser(trx, newUserId, showId),
      ),
    )
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
