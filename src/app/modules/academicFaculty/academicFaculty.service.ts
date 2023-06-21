import { SortOrder } from 'mongoose';
import { pagenationHelpers } from '../../../helpers/pagenationHelpers';
import { IGenericResponce } from '../../../interfaces/common';
import { IPagenationOptions } from '../../../interfaces/pagenationOptions';
import { academicFacultySharchAbleFields } from './academicFaculty.constent';
import {
  IAcademicFaculty,
  IAcademicFacultyFiltes,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFacultyModel';
// import { academicFacultySharchAbleFields } from './academicFaculty.constent';

//pagination work for this code
const getAllFacultes = async (
  filters: IAcademicFacultyFiltes, //search for this code
  pagenationOptions: IPagenationOptions
): Promise<IGenericResponce<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    pagenationHelpers.calculatePagenation(pagenationOptions);

  //search for this code =========
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySharchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //=============================^

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//pagenation work for code ^

//==========post data ======>
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

//===========post faculty data create ===^

//-=====get singel data from database =====>

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
//==========get data from database single data===^

//==========update faculty data===========>
const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

//==========update faculty data===========^

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFacultes,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
