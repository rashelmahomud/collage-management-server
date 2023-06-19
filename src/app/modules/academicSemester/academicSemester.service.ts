import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagenation from '../../../helpers/pagenationHelpers';
import { IGenericResponce } from '../../../interfaces/common';
import { IPagenationOptions } from '../../../interfaces/pagenationOptions';
import { academicSemesterTitleCodeMapper } from './academicSemester.constent';
import { IAcademiSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemesterModel';

const createSemester = async (
  payload: IAcademiSemester
): Promise<IAcademiSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid Semester Code..');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  pagenationOptions: IPagenationOptions
): Promise<IGenericResponce<IAcademiSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagenation(pagenationOptions);

  const sortCodtions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCodtions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort({ year: 'asc' })
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
