import { product, Product } from '../models/product'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import verifyAuthToken from '../midlleware/verifyToken'

// Creating instence of The Product Class.
const pro = new Product()

const index = async (req: Request, res: Response) => {
  try {
    const products = await pro.index()
    res.status(200)
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  if (req.body.name != null && req.body.price != null) {
    try {
      const prc: product = {
        name: req.body.name,
        price: req.body.price
      }
      const creat = await pro.create(prc)
      res.send(creat)
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
    const prod = await pro.show(req.params.id as unknown as number)
    res.json(prod)
  } catch (error) {
    res.status(400)
    res.json({
      Status_Code: 400,
      ERROR: 'BAD REQUEST',
      Cause: `Couldnt Retreave User ${params}`
    })
  }
}
// Creating the Routes..
const productRoutes = (app: express.Application): void => {
  app.use('/products', bodyParser.json())
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

//exporting The productRoute ..
export default productRoutes
