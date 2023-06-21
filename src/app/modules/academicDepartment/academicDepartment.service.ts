import { SortOrder } from 'mongoose';
import { pagenationHelpers } from '../../../helpers/pagenationHelpers';
import { IGenericResponce } from '../../../interfaces/common';
import { IPagenationOptions } from '../../../interfaces/pagenationOptions';
import { academicDeartmentSharchAbleFields } from './academicDepartment.constent';
import {
  IAcademicDeartment,
  IAcademicDevelopmentFiltes,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
// import { academicFacultySharchAbleFields } from './academicFaculty.constent';

//==========post data ======>
const createDepartment = async (
  payload: IAcademicDeartment
): Promise<IAcademicDeartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

//===========post department data create ===^

//get all data and pagenations ==================>
const getAllDepartments = async (
  filters: IAcademicDevelopmentFiltes, //search for this code
  pagenationOptions: IPagenationOptions
): Promise<IGenericResponce<IAcademicDeartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    pagenationHelpers.calculatePagenation(pagenationOptions);

  //search for this code =========
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDeartmentSharchAbleFields.map(field => ({
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

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//get all data and pagenations ==================^

//======get single data from database =======>
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDeartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};
//======get single data from database =======^

//======get update data from database =======>

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDeartment>
): Promise<IAcademicDeartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

//======get update data from database =======^

//========delete from database data=========>

const deleteDevelopment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  );
  return result;
};
//========delete from database data=========^

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDevelopment,
};
