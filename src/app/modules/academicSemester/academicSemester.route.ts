import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/academic-semester',

  validationRequest(AcademicSemesterValidation.createAcademiSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const SemesterRoute = router;
