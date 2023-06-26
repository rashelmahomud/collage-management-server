import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { UserController } from './users.controller';

const router = express.Router();

router.post(
  '/create-student',
  validationRequest(userValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  validationRequest(userValidation.createFacultyZodSchema),
  UserController.createFaculy
);

router.post(
  '/create-admin',
  validationRequest(userValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoute = router;
