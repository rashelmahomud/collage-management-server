import { Schema, model } from 'mongoose';
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
      type: Number,
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
export const AcademicSemester = model<IAcademiSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
