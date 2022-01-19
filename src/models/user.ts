import bcrypt from 'bcrypt'
import client from '../database'
import dotenv from 'dotenv'
dotenv.config()
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export type user = {
  id?: number | string
  first_name: string
  last_name: string
  password: string
}

export class User {
  async index(): Promise<user[]> {
    try {
      const sql = 'SELECT * FROM users'
      const connection = await client.connect()
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`No table were Found ${error}`)
    }
  }
  async create(us: user): Promise<user> {
    try {
      const connection = await client.connect()
      const sql = 'INSERT INTO USERS(first_name ,last_name,password) Values ($1,$2,$3) RETURNING *'
      const hash = bcrypt.hashSync(us.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string))
      const result = await connection.query(sql, [us.first_name, us.last_name, hash])
      const user = result.rows[0]
      connection.release()
      return user
    } catch (error) {
      throw new Error(`couldnt Create ${error}`)
    }
  }
  async show(id: number): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const connection = await client.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find User ${id}`)
    }
  }
}

//     async authenticate(username: string, password: string): Promise<user | null> {
//          // @ts-ignore
//         const conn = await client.connect()
//         const sql = 'SELECT password FROM users WHERE email=($1)'
//         const result = await conn.query(sql, [username])
//         if(result.rows.length) {
//         const user = result.rows[0]
//         if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)) {
//             console.log("pass match");
//             return user
//         }
//         }
//         return null
//     }
// }
