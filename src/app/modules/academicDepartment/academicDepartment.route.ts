import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(
    academicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);
router.get('/', AcademicDepartmentController.getAllDepartments);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validationRequest(
    academicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);
router.delete('/:id', AcademicDepartmentController.deleteDevelopment);
export const AcademicDepartmentRoute = router;
