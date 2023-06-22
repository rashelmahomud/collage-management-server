import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { pagenationHelpers } from '../../../helpers/pagenationHelpers';
import { IGenericResponce } from '../../../interfaces/common';
import { IPagenationOptions } from '../../../interfaces/pagenationOptions';
import { studentSharchAbleFields } from './student.conestent';
import { IStudent, IStudentFiltes } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async (
  filters: IStudentFiltes, //search for this code
  pagenationOptions: IPagenationOptions
): Promise<IGenericResponce<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  //search for this code =========
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: studentSharchAbleFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    pagenationHelpers.calculatePagenation(pagenationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

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

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);

  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student is not found.');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateStudent as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updateStudent as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      (updateStudent as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// //===========deleter semester code here...
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
// //==========delete semester code here ====^

export const studentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
