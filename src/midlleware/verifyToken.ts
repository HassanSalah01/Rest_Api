import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { TOKEN_SECRET } = process.env

const verifyAuthToken = (req: Request, res: Response, next: Function): void => {
  if (req.headers.authorization != null && req.headers.authorization != undefined) {
    try {
      const authorizationHeader = req.headers.authorization as string
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, TOKEN_SECRET as string)
      if (decoded) {
        next()
      } else {
        res.status(400)
        res.json({
          Status_Code: 400,
          ERROR: 'Bad Request',
          Cause: 'Invalid Token'
        })
      }
    } catch (error) {
      res.status(401)
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
export default verifyAuthToken
