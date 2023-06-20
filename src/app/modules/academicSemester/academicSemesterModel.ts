import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCodes,
  academicSemesterTitles,
  accademicSemesterMonth,
} from './academicSemester.constent';
import {
  AcademicSemesterModel,
  IAcademiSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademiSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: accademicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: accademicSemesterMonth,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'academic sermister already exsist..');
  }
  next();
});

export const AcademicSemester = model<IAcademiSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
