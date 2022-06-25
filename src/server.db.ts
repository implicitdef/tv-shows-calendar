import { ColumnType, Generated, Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

type Database = {
    raw_json_data: {
        id: Generated<number>
        content: string
        creation_time: ColumnType<Date, Date | undefined, never>
    }
    users: {
        id: Generated<number>
        email: string
        password_hash: string
        salt: string
        created_at: ColumnType<Date, Date | undefined, never>
    }
    users_series: {
        user_id: number
        serie_id: number
        created_at: ColumnType<Date, Date | undefined, never>
    }
}

let db: Kysely<Database> | null = null
export function getDb(): Kysely<Database> {
    if (!db) {
        console.log('~~~ Connecting to the db')
        db = new Kysely<Database>({
            dialect: new PostgresDialect({
                pool: new Pool({
                    // TODO change that
                    host: '127.0.0.1',
                    user: 'eletallieur',
                    password: '',
                    database: 'tv_shows_calendar',
                }),
            }),
        })
    }
    return db
}
