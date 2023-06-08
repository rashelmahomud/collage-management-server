import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandelers from './app/middlewares/globalErrorHandeler'
import { UserRoute } from './app/modules/user/users.route'
const app: Application = express()

app.use(cors())

// parser s code here

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user', UserRoute.router)

// app.get('/', async (req: Request, res: Response, next) => {
//   console.log(x)
// })

app.use(globalErrorHandelers)

export default app
