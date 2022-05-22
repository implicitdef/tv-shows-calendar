import { QueryInterface } from 'knex'
import { knexToPromise } from 'tv/server/utils/utils'

type User = {
  id: number
  google_user_id: string
}
type UserSerieRow = {
  user_id: number
  serie_id: number
}

export async function getUserByGoogleUserId(
  knex: QueryInterface,
  googleUserId: string,
): Promise<User | null> {
  const rows = await knexToPromise<User[]>(
    knex
      .select()
      .where({
        google_user_id: googleUserId,
      })
      .from('users'),
  )
  if (rows.length > 0) {
    return rows[0]
  } else {
    return null
  }
}

export async function saveUser(
  knex: QueryInterface,
  googleUserId: string,
): Promise<number> {
  const rows = await knexToPromise<number[]>(
    knex
      .insert({
        google_user_id: googleUserId,
      })
      .into('users')
      .returning('id'),
  )
  if (rows.length === 1) {
    return rows[0]
  } else {
    throw new Error(`${rows.length} rows were created by the saveUser query`)
  }
}

export async function addSerieToUser(
  knex: QueryInterface,
  userId: number,
  serieId: number,
): Promise<void> {
  try {
    await knexToPromise<unknown>(
      knex
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

export async function removeSerieFromUser(
  knex: QueryInterface,
  userId: number,
  serieId: number,
): Promise<void> {
  return knexToPromise<void>(
    knex
      .del()
      .where({
        user_id: userId,
        serie_id: serieId,
      })
      .from('users_series'),
  )
}

export async function getSeriesOfUser(
  knex: QueryInterface,
  userId: number,
): Promise<number[]> {
  const rows = await knexToPromise<UserSerieRow[]>(
    knex
      .select()
      .from('users_series')
      .where({
        user_id: userId,
      })
      .orderBy('serie_id', 'asc'),
  )
  return rows.map(row => row.serie_id)
}

export async function pushData(
  knex: QueryInterface,
  data: string,
): Promise<void> {
  return await knexToPromise<void>(
    knex.insert({ content: data }).into('raw_json_data'),
  )
}
