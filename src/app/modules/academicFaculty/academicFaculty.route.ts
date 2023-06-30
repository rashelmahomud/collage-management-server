import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(academicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_USER),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_USER,
    ENUM_USER_ROLE.FACULTY
  ),
  AcademicFacultyController.getSingleFaculty
);

router.patch(
  '/:id',
  validationRequest(academicFacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_USER, ENUM_USER_ROLE.FACULTY),
  AcademicFacultyController.updateFaculy
);

router.get('/', AcademicFacultyController.getAllSemesters);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_USER, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.deleteFaculy
);

export const AcademicFacultyRoute = router;
