import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandelers from './app/middlewares/globalErrorHandeler';
import { SemesterRoute } from './app/modules/academicSemester/academicSemester.route';
import { UserRoute } from './app/modules/user/users.route';
const app: Application = express();

app.use(cors());

// parser s code here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/semester', SemesterRoute);

// app.get('/', async (req: Request, res: Response, next) => {
//   console.log(x)
// })

app.use(globalErrorHandelers);

export default app;
