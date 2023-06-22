import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagenationFields } from '../../../constant/pagenation';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponce from '../../../shared/sendResponce';
import { studentFilterAbleFields } from './student.conestent';
import { studentService } from './student.service';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterAbleFields);
  const pagenationOptions = pick(req.query, pagenationFields);

  const result = await studentService.getAllStudent(pagenationOptions, filters);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student All Data Get successfully',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingelStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudent(id);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student songle Data Get successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await studentService.updateStudent(id, updateData);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student update done',
    data: result,
  });
  // next();
});

// //======Deleter Semester code here =========>
const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await studentService.deleteStudent(id);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student Delete.. done',
    data: result,
  });
});

// //======Deleter Semester code here =========^

export const StudentController = {
  getAllStudent,
  getSingelStudent,
  updateStudent,
  deleteStudent,
};
