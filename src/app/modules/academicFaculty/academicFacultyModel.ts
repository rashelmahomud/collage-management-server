import status from 'http-status';
import { Schema, model } from 'mongoose';

import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import ApiError from '../../../errors/ApiError';

///this is a user model
const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic faculty is already exsist..');
  }
  next();
});

// export default academicSemesterSchema;

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
