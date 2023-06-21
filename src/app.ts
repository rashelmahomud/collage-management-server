import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandelers from './app/middlewares/globalErrorHandeler';

import httpStatus from 'http-status';
import routers from './app/routes';
const app: Application = express();

app.use(cors());

// parser s code here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routers);
// app.use('/api/v1/user', UserRoute);
// app.use('/api/v1/semester', SemesterRoute);

// app.get('/', async (req: Request, res: Response, next) => {
//   console.log(x)
// })

app.use(globalErrorHandelers);

// kaw jodi api bul day taholla ai error ta sbe=============
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  });
  next();
});

export default app;
