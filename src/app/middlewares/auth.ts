import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwthelpers';

const auth =
  (...requiredRole: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authoraize token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authoraize..');
      }

      //verityed token..
      let verifyedUser = null;
      try {
        verifyedUser = jwtHelper.verifyToken(
          token,
          config.jwt.secret as Secret
        );
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'invalid token');
      }

      req.user = verifyedUser;

      if (requiredRole.length && !requiredRole.includes(verifyedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbiden');
      }

      next();
    } catch (error) {
      next();
    }
  };

export default auth;
