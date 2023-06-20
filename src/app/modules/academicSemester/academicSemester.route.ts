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
router.get('/', AcademicSemesterController.getAllSemester);
router.get('/:id', AcademicSemesterController.getSingelSemester);
router.patch('/:id', AcademicSemesterController.updateSemester);

export const SemesterRoute = router;
