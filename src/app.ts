import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

// parser

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user/v1/user/', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
