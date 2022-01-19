import { order, Order, order_products } from '../models/order'
import express, { Request, Response } from 'express'
import verifyAuthToken from '../midlleware/verifyToken'
import bodyParser from 'body-parser'

const or = new Order()

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allorders = await or.index()
    res.json(allorders)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}
const create = async (req: Request, res: Response): Promise<void> => {
  if (req.body.status != null && req.body.user_id != null) {
    try {
      const ord: order = {
        status: req.body.status,
        user_id: req.body.user_id
      }
      const creat = await or.create(ord)
      res.json(creat)
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
    const order = await or.show(req.params.id as unknown as number)
    res.json(order)
  } catch (error) {
    res.status(400)
    res.json({
      Status_Code: 400,
      ERROR: 'BAD REQUEST',
      Cause: `Couldnt Retreave User ${params}`
    })
  }
}
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const addedProduct = await or.addProduct(
      req.body.quantity,
      parseInt(req.params.id),
      req.body.product_id
    )
    res.json(addedProduct)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}
const userOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const ord = await or.currentOrdersByUser(parseInt(req.params.user_id))

    res.json(ord)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// Creating the Routes..
const orderRoutes = (app: express.Application): void => {
  app.use('/orders', bodyParser.json())
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.post('/orders/:id/products', verifyAuthToken, addProduct)
  app.get('/orders/user/:user_id', verifyAuthToken, userOrders)
}

//exporting The productRoute ..
export default orderRoutes
