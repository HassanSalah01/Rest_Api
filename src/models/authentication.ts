import bcrypt from 'bcrypt'
import client from '../database'
import dotenv from 'dotenv'
import { user } from './user'
dotenv.config()
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export class Authenticate {
  async authenticate(username: string, password: string): Promise<user | null> {
    // @ts-ignore
    const conn = await client.connect()
    const sql = 'SELECT password FROM users WHERE email=($1)'
    const result = await conn.query(sql, [username])
    if (result.rows.length) {
      const user = result.rows[0]
      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        return user
      }
    }
    return null
  }
}
