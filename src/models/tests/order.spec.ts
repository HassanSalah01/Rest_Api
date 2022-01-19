import { order, order_products, Order } from '../order'
import { user, User } from '../user'
import { request } from '../../tests/index.spec'
import client from '../../database'
const or = new Order()
const usr = new User()
describe('order test', () => {
  it('should have an index function 1 ', () => {
    expect(or.index).toBeDefined()
  })
  it('it should return empty object 2 ', () => {
    expect(or.index.length).toBe(0)
  })
  it('should have an index function 1 ', () => {
    expect(or.show).toBeDefined()
  })
  it('should have an index function 1 ', () => {
    expect(or.create).toBeDefined()
  })
})

afterEach(async () => {
  const connection = await client.connect()
  const sql = 'DELETE FROM orders'
  const sql2 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
  await connection.query(sql)
  await connection.query(sql2)
  connection.release()
})
