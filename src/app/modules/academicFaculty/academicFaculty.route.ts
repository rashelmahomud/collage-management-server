import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(academicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validationRequest(academicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculy
);

router.get('/', AcademicFacultyController.getAllSemesters);
router.delete('/:id', AcademicFacultyController.deleteFaculy);

export const AcademicFacultyRoute = router;
