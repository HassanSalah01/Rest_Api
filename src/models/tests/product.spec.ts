import { product, Product } from '../product'
import { request } from '../../tests/index.spec'
import client from '../../database'
const pro = new Product()

describe('this is concerned with the product model', () => {
  it('should have an index function 1 ', () => {
    expect(pro.index).toBeDefined()
  })
  it('it should return empty object 2 ', () => {
    expect(pro.index.length).toBe(0)
  })
  it('should have an index function 1 ', () => {
    expect(pro.show).toBeDefined()
  })
  it('should have an index function 1 ', () => {
    expect(pro.create).toBeDefined()
  })
})
describe('Product MODEL CREATE Method', () => {
  const pros = {
    id: 1,
    name: 'name',
    price: 123
  } as product

  it('check if product is created ', async () => {
    const result = await pro.create(pros)
    expect(result).toEqual({
      id: 1,
      name: 'name',
      price: 123
    })
  })
  it('check if the id of The product is created right', async () => {
    const result = await pro.create(pros)
    expect(result.id).toEqual(1)
  })
  it('check if the firstname is created right', async () => {
    const result = await pro.create(pros)
    expect(result.name).toEqual('name')
  })
  it('check if the lastname is created right', async () => {
    const result = await pro.create(pros)
    expect(result.price).toEqual(123)
  })
  describe('Product  MODEL SHOW  Method', () => {
    const pros = {
      id: 1,
      name: 'name',
      price: 123
    } as product
    const pros2 = {
      id: 1,
      name: 'name',
      price: 123
    } as product
    it('show id 2', async () => {
      const result = await pro.create(pros)
      const result2 = await pro.create(pros2)
      const result3 = await pro.show(2)
      expect(result3.id).toBe(2)
    })
    it('show id 1 ', async () => {
      const result = await pro.create(pros)
      const result3 = await pro.show(1)
      expect(result3.id).toBe(1)
    })
  })
})

// afterAll(async () => {
//   const connection = await client.connect()
//   const sql = 'DELETE FROM products'
//   const sql2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
//   await connection.query(sql)
//   await connection.query(sql2)
//   connection.release()
// })
