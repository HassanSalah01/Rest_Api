import dotenv from 'dotenv'
import { Pool } from 'pg'
let client
dotenv.config()

const { POSTGRES_USER, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_HOST, POSTGRES_PASSWORD, ENV } =
  process.env
if (ENV === 'test') {
  client = new Pool({
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD
  })
}
if (ENV === 'dev') {
  client = new Pool({
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD
  })
}

export default client as Pool
