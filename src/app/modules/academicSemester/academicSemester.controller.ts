import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { pagenationFields } from '../../../constant/pagenation';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponce from '../../../shared/sendResponce';
import { academicSemesterFilterAbleFields } from './academicSemester.constent';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterAbleFields);
  const pagenationOptions = pick(req.query, pagenationFields);

  const result = await AcademicSemesterService.getAllSemester(
    pagenationOptions,
    filters
  );
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester All Data Get successfully',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingelSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic songle Data Get successfully',
    data: result,
  });
});
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updateData);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester update done',
    data: result,
  });
  // next();
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingelSemester,
  updateSemester,
};
