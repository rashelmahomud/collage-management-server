import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './users.controller';

const router = express.Router();

router.post(
  '/create-user',
  validationRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoute = router;
