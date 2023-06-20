import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { pagenationHelpers } from '../../../helpers/pagenationHelpers';
import { IGenericResponce } from '../../../interfaces/common';
import { IPagenationOptions } from '../../../interfaces/pagenationOptions';
import {
  IAcademiSemesterFilters,
  academicSemesterTitleCodeMapper,
  adcademicSemesterSearchAbleFields,
} from './academicSemester.constent';
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
  pagenationOptions: IPagenationOptions,
  filters: IAcademiSemesterFilters
): Promise<IGenericResponce<IAcademiSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adcademicSemesterSearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    pagenationHelpers.calculatePagenation(pagenationOptions);

  const sortCodtions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCodtions[sortBy] = sortOrder;
  }
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
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
