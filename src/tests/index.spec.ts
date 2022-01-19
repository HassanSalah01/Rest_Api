import supertest from 'supertest'
import app from '../index'

// create a request object
export const request = supertest(app)

describe('Test endpoint response', () => {
  it('End point test 9', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
