import status from 'http-status';
import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDeartment,
} from './academicDepartment.interface';
import ApiError from '../../../errors/ApiError';

///this is a user model
const academicDepartmentSchema = new Schema<IAcademicDeartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      'Academic Department is already exsist..'
    );
  }
  next();
});

// export default academicSemesterSchema;

export const AcademicDepartment = model<
  IAcademicDeartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
