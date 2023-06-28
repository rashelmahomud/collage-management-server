import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import { ILoginUserResponce } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginUser } = req.body;
    const result = await AuthService.loginUser(loginUser);

    sendResponce<ILoginUserResponce>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user login created successfully',
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
};
