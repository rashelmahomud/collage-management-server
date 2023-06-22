import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingelStudent);
router.patch(
  '/:id',
  validationRequest(studentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoute = router;
