import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { pagenationFields } from '../../../constant/pagenation';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponce from '../../../shared/sendResponce';
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
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
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

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
