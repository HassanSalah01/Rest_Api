import { user, User } from '../user'
import client from '../../database'

const usr = new User()

describe('USER MODEL Index Method', () => {
  it('The Index Function Should be defined ', () => {
    expect(usr.index).toBeDefined()
  })
  it('it should return empty object  ', () => {
    expect(usr.index.length).toBe(0)
  })
})
describe('USER MODEL CREATE Method', () => {
  const us = {
    first_name: 'fname',
    last_name: 'lname',
    password: 'pass'
  } as user
  it('The Create Function Should be defined ', () => {
    expect(usr.create).toBeDefined()
  })
  it('check if user is created ', async () => {
    const result = await usr.create(us)
    expect(result).toEqual({
      id: result.id,
      first_name: 'fname',
      last_name: 'lname',
      password: result.password
    })
  })
  it('check if the id of The user is created right', async () => {
    const result = await usr.create(us)
    expect(result.id).toEqual(1)
  })
  it('check if the firstname is created right', async () => {
    const result = await usr.create(us)
    expect(result.first_name).toEqual('fname')
  })
  it('check if the lastname is created right', async () => {
    const result = await usr.create(us)
    expect(result.last_name).toEqual('lname')
  })
})

describe('USER MODEL SHOW Method', () => {
  const us = {
    first_name: 'fname',
    last_name: 'lname',
    password: 'pass'
  } as user
  const us2 = {
    first_name: 'gsdfsname',
    last_name: 'ldfsdfname',
    password: 'password'
  } as user
  it('show id 1', async () => {
    const result = await usr.create(us)
    const result2 = await usr.create(us2)
    const result3 = await usr.show(2)
    expect(result3.id).toBe(2)
  })
  it('show id 2 ', async () => {
    const result = await usr.create(us)
    const result3 = await usr.show(1)
    expect(result3.id).toBe(1)
  })
})

afterAll(async () => {
  const connection = await client.connect()
  const sql = 'DELETE FROM users'
  const sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
  await connection.query(sql)
  await connection.query(sql2)
  connection.release()
})
