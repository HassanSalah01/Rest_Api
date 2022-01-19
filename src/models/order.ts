import client from '../database'

export type order = {
  id?: number
  status: string
  user_id: number
}
export type order_products = {
  id?: number
  quantity: number
  order_id: number
  product_id: number
}

export class Order {
  async index(): Promise<order[]> {
    try {
      const sql = 'SELECT * FROM orders'
      const connection = await client.connect()
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`NO Table Were Found ${error}`)
    }
  }
  async show(id: number): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const connection = await client.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find order ${id}`)
    }
  }
  async create(ord: order): Promise<order> {
    try {
      const connection = await client.connect()
      const sql = 'INSERT INTO orders (status,user_id) Values ($1,$2) RETURNING *'
      const result = await connection.query(sql, [ord.status, ord.user_id])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error(`couldnt Create ${error}`)
    }
  }
  async addProduct(quan: number, ordId: number, proId: number): Promise<order_products> {
    try {
      const sql =
        'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *'
      const connection = await client.connect()
      const result = await connection.query(sql, [quan, ordId, proId])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error(`couldnt add new product ${proId} To The order ${ordId}`)
    }
  }
  async currentOrdersByUser(usId: number): Promise<{ id: number }[]> {
    try {
      const sql =
        'SELECT orders.id FROM users JOIN orders ON users.id = orders.user_id where users.id =($1)'
      const connection = await client.connect()
      const result = await connection.query(sql, [usId])
      const order = result.rows
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Failed To retreive orders from user ${usId}`)
    }
  }
}
