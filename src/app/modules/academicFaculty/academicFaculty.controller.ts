import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagenationFields } from '../../../constant/pagenation';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponce from '../../../shared/sendResponce';
import { academicFacultyFilterAbleFields } from './academicFaculty.constent';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await AcademicFacultyService.createFaculty(
      academicFacultyData
    );

    sendResponce(res, {
      //this code daynamically handel for have a sendResponce.ts file.
      statusCode: httpStatus.OK,
      success: true,
      message: 'create Faculty in successfully done',
      data: result,
    });
  }
);

//pagenation work for code>
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  //get all data
  const filters = pick(req.query, academicFacultyFilterAbleFields); //search for this code
  const pagenationOptions = pick(req.query, pagenationFields);

  const result = await AcademicFacultyService.getAllFacultes(
    filters,
    pagenationOptions
  );

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Faculty in successfully done',
    meta: result.meta,
    data: result.data,
  });
});
//pagenation work for code ^

//singlege faculty data get ==== >
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Faculty in single data successfully done',
    data: result,
  });
});

//singlege faculty data get===^

//=========data update =========>
const updateFaculy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updateData);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully update data',
    data: result,
  });
});
//=========data update =========^

//=====delete data from faculty======= >
const deleteFaculy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'seccessfully delete faculty data',
    data: result,
  });
});
//=======delete data from database faculty=====^

export const AcademicFacultyController = {
  createFaculty,
  getAllSemesters,
  getSingleFaculty,
  updateFaculy,
  deleteFaculy,
};
