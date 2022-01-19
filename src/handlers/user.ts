import { user, User } from '../models/user'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../midlleware/verifyToken'
import dotenv from 'dotenv'
const { TOKEN_SECRET } = process.env

const store = new User()

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await store.index()
    res.json(allUsers)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  if (req.body.first_name != null && req.body.last_name != null && req.body.password != null) {
    try {
      const user: user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
      }
      const creat = await store.create(user)
      const token = jwt.sign({ user: creat }, TOKEN_SECRET as Secret)
      res.json(token)
    } catch (error) {
      res.status(400)
      res.json(error)
    }
  } else {
    res.status(400)
    res.json({
      Status_Code: 400,
      ERROR: 'BAD REQUEST',
      Cause: 'MISSING FIELDS'
    })
  }
}
const show = async (req: Request, res: Response): Promise<void> => {
  const params = req.params.id as unknown as number
  try {
    const users = await store.show(req.params.id as unknown as number)
    res.json(users)
  } catch (error) {
    res.status(400)
    res.json({
      Status_Code: 400,
      ERROR: 'BAD REQUEST',
      Cause: `Couldnt Retreave User ${params}`
    })
  }
}

// const test = async(req:Request,res:Response)=>{
//     try
//     {
//         const creat = await store.authenticate(req.body.email,req.body.password);
//         res.json(creat);
//     } catch (error) {
//         res.status(400);
//         res.json(error);
//     }
// }

const userRoute = (app: express.Application) => {
  app.use('/users', bodyParser.json())
  app.get('/users', verifyAuthToken, index)
  app.post('/users', create)
  app.get('/users/:id', verifyAuthToken, show)
  // app.post('/user/auth',test);
}

export default userRoute
