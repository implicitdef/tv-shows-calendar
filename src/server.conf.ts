import { PoolConfig } from 'pg'

function reverse(s: string): string {
    return s.split('').reverse().join('')
}

export const PUSH_DATA_API_KEY =
    process.env.PUSH_DATA_API_KEY || 'pushDataApiKey'

export const JWT_SECRET = process.env.JWT_SECRET || 'jwtSecret'

export const DB_POOL_CONFIG: PoolConfig = process.env.DATABASE_URL
    ? {
          connectionString: `${process.env.DATABASE_URL}`,
          // https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8
          ssl: { rejectUnauthorized: false },
      }
    : {
          host: '127.0.0.1',
          user: 'manu',
          password: '',
          database: 'tv_shows_calendar',
      }
