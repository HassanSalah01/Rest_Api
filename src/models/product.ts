import client from '../database'

export type product = {
  id?: number
  name: string
  price: number
}

export class Product {
  async index(): Promise<product[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`NO Table Were Found ${error}`)
    }
  }
  async create(pr: product): Promise<product> {
    try {
      const connection = await client.connect()
      const sql = 'INSERT INTO products(name , price) Values ($1,$2) RETURNING *'
      const result = await connection.query(sql, [pr.name, pr.price])
      const product = result.rows[0]
      connection.release()
      return product
    } catch (error) {
      throw new Error(`couldnt Create ${error}`)
    }
  }
  async show(id: number): Promise<product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const connection = await client.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find Product ${id}`)
    }
  }
}
