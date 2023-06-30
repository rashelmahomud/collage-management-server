import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import { ILoginUserResponce, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginUser } = req.body;
    const result = await AuthService.loginUser(loginUser);
    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    delete result.refreshToken;

    sendResponce<ILoginUserResponce>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user login created successfully',
      data: others,
    });
  }
);

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    // delete result.refreshToken;

    sendResponce<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'refresh Token is successfully',
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
};
