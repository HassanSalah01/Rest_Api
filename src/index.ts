import express, { Application, Request, Response } from 'express'
import userRoutes from './handlers/user'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRoute from './handlers/user'
import productRoute from './handlers/product'
import orderRoute from './handlers/order'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
// UserRoutes(app);
userRoute(app)
// productRoute(app);
productRoute(app)
//orderRoute(app)
orderRoute(app)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
