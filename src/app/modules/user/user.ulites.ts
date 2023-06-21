import { IAcademiSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id;
};
export const genaratedStudentId = async (
  academicSemester: IAcademiSemester
) => {
  const curentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(curentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};

//=============^  user generated ID code ^===================

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const findFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return findFaculty?.id;
};

export const generatedFacultyId = async (): Promise<string> => {
  const curentIds =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedFId = (parseInt(curentIds) + 1).toString().padStart(5, '0');

  incrementedFId = ` F-${incrementedFId}`;
  return incrementedFId;
};
//===================faculty genareted id here ^=========================
