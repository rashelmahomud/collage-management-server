import { IAcademiSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemesterModel';

const createSemester = async (
  payload: IAcademiSemester
): Promise<IAcademiSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
