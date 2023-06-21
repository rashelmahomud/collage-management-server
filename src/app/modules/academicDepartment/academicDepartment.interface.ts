import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDeartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcademicDepartmentModel = Model<IAcademicDeartment>;

export type IAcademicDevelopmentFiltes = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
