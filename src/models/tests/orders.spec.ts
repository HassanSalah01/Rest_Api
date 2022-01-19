import { order, order_products, Order } from '../order'
import { product, Product } from '../product'
import { user, User } from '../user'
import client from '../../database'

const use = new User()
const pro = new Product()
const or = new Order()

describe('ORDER MODEL Tests', () => {
  const user1 = {
    first_name: 'hassan',
    last_name: 'salah',
    password: '123456'
  } as user
  const prod = {
    name: 'nokia',
    price: 12345
  } as product

  const ttt = {
    user_id: 1,
    status: 'active'
  } as order
  it('should have an index function  ', () => {
    expect(or.index).toBeDefined()
  })
  it(' it should return empty object ', async () => {
    expect(or.index.length).toBe(0)
  })
  it('Show function length return 1 ', async () => {
    const uuu = await use.create(user1)
    const ppp = await pro.create(prod)
    const ooo = await or.create(ttt)
    expect(or.show.length).toBe(1)
  })
  it('should have an index function 1 ', () => {
    expect(or.show).toBeDefined()
  })

  it('Create An order', async () => {
    const uuu = await use.create(user1)
    const ppp = await pro.create(prod)
    const ooo = await or.create(ttt)
    expect(ooo.id).toEqual(1)
  })
  it('it add a product To Many To Many TAble addProduct function ', async () => {
    const uuu = await use.create(user1)
    const ppp = await pro.create(prod)
    const ooo = await or.create(ttt)
    const opop = await or.addProduct(20, 1, 1)
    expect(opop.quantity).toEqual(20)
  })
  it('currentOrderByUser ', async () => {
    const uuu = await use.create(user1)
    const ppp = await pro.create(prod)
    const ooo = await or.create(ttt)
    const opop = await or.addProduct(20, 1, 1)
    const opop2 = await or.currentOrdersByUser(1)
    expect(opop2[0].id).toEqual(1)
  })
})

afterEach(async () => {
  const connection = await client.connect()
  const sql = 'DELETE FROM products'
  const sql2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
  const sql3 = 'DELETE FROM users'
  const sql4 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
  const sql5 = 'DELETE FROM orders'
  const sql6 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
  const sql7 = 'DELETE FROM order_products'
  const sql8 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1'
  await connection.query(sql8)
  await connection.query(sql7)
  await connection.query(sql6)
  await connection.query(sql5)
  await connection.query(sql4)
  await connection.query(sql3)
  await connection.query(sql2)
  await connection.query(sql)
  connection.release()
})
