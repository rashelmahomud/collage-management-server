import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwthelpers';
import { User } from '../user/user.model';
import {
  ILoginUserResponce,
  IRefreshTokenResponse,
  IUserLogin,
} from './auth.interface';

const loginUser = async (payload: IUserLogin): Promise<ILoginUserResponce> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);
  // check password
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMetched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password not metched');
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expier_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh as Secret,
    config.jwt.refresh_expier_in as string
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
let verifiedToken = null;
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  try {
    verifiedToken = jwtHelper.verifyToken(token, config.jwt.refresh as Secret);
  } catch (error) {
    //error handel
    throw new ApiError(httpStatus.FORBIDDEN, 'refresh token is forbiden');
  }
  const { userId } = verifiedToken;
  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does-not exsist');
  }
  //generate new token

  const newAccessToken = jwtHelper.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expier_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
