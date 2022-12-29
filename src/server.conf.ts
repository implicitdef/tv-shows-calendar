import { PoolConfig } from 'pg'

export const PUSH_DATA_API_KEY =
    process.env.PUSH_DATA_API_KEY || 'pushDataApiKey'

export const JWT_SECRET = process.env.JWT_SECRET || 'jwtSecret'

export const DB_POOL_CONFIG: PoolConfig = process.env.DB_HOST
    ? {
          //   connectionString: `${process.env.DATABASE_URL}`,
          // https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8
          //   ssl: { rejectUnauthorized: false },
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PWD,
          database: process.env.DB_NAME,
      }
    : {
          host: '127.0.0.1',
          user: 'eletallieur',
          password: '',
          database: 'tv_shows_calendar',
      }

console.log('Using pool config with host : ', DB_POOL_CONFIG.host)
