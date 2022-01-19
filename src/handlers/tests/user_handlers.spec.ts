import { request } from '../../tests/index.spec'
import client from '../../database'

beforeAll(async () => {
  const user = {
    first_name: 'name',
    last_name: 'lastname',
    password: 'testpass'
  }
})

describe('USERS HANDLERS METHODS', () => {
  let token: string
  it('POST users will return a token with seperated .', async () => {
    const user = {
      first_name: 'first4',
      last_name: 'last4',
      password: 'randompassword'
    }
    const response = await request.post('/users').send(user)
    token = response.body
    expect(token.split('.').length).toBe(3)
  })
  it('Expect to return 400 because no token is supplied ', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
  })
  it('Expect to return 200 because token is supplied ', async () => {
    const response = await request.get('/users')
    expect(response.status).toEqual(400)
  })
  it('Expect to return 400 because no token is supplied to /user/1 ', async () => {
    const response = await request.get('/users/1')
    expect(response.status).toEqual(400)
  })

  it('Expect to return 200 because token is supplied to /user/1', async () => {
    const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
  })
  it('Expect to return 404 Wrong adress', async () => {
    const response = await request.get('/users1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(404)
  })
})
afterEach(async () => {
  const connection = await client.connect()
  const sql = 'DELETE FROM users'
  const sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
  await connection.query(sql)
  await connection.query(sql2)
  connection.release()
})
