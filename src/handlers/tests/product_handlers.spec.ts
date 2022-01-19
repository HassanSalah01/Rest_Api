import { request } from '../../tests/index.spec'
import client from '../../database'
describe('PRODUCT HANDLERS METHODS', () => {
  let token: string
  it('just create a new user for the token ', async () => {
    const user = {
      first_name: 'first4',
      last_name: 'last4',
      password: 'randompassword'
    }
    const response = await request.post('/users').send(user)
    token = response.body
  })
  it('Expect to return 200  ', async () => {
    const response = await request.get('/products')
    expect(response.status).toEqual(200)
  })

  it('Expect to return 200 /products/id ', async () => {
    const response = await request.get('/products/1')
    expect(response.status).toEqual(200)
  })
  it('Expect responce.body.id to be equal to Pro.id ', async () => {
    const pro = {
      name: 'testname',
      price: 1234
    }
    const response = await request
      .post('/products')
      .send(pro)
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.id).toEqual(1)
  })
  it('Expect responce.body.nanme to be equal to Pro.name', async () => {
    const pro = {
      name: 'testname2',
      price: 12345
    }
    const response = await request
      .post('/products')
      .send(pro)
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.name).toEqual('testname2')
  })
  it('Expect responce.body.number Not to be NaN  ex ', async () => {
    const pro = {
      name: 'testname2',
      price: 12345
    }
    const response = await request
      .post('/products')
      .send(pro)
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.price).not.toBeNaN()
  })
})

afterEach(async () => {
  const connection = await client.connect()
  const sql = 'DELETE FROM products'
  const sql2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
  await connection.query(sql)
  await connection.query(sql2)
  connection.release()
})
