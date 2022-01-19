import { request } from '../../tests/index.spec'
import client from '../../database'

describe('Orders HANDLERS METHODS', () => {
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
  it('Expect to return 200 get/orders WITH TOken  ', async () => {
    const response = await request.get('/orders').set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
  })
  it('Expect to return 200 get/orders WITHout TOken ', async () => {
    const response = await request.get('/orders')
    expect(response.status).toEqual(400)
  })
  it('Expect to return 200 get/orders/1 WITH TOken  ', async () => {
    const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
  })
  it('Expect to return 200 get/orders/1 WITHout TOken ', async () => {
    const response = await request.get('/orders/1')
    expect(response.status).toEqual(400)
  })

  it('Expect to return 200 post/orders WITHout TOken ', async () => {
    const response = await request.post('/orders')
    expect(response.status).toEqual(400)
  })
  it('Expect to return 200 post/orders/1/products WITHout TOken ', async () => {
    const response = await request.post('/orders/1/products')
    expect(response.status).toEqual(400)
  })
  it('Expect to return 200 /orders/user/:user_id WITHout TOken ', async () => {
    const response = await request.post('/orders/user/1')
    expect(response.status).toEqual(404)
  })
})
