import { Model } from 'mongoose';

export type academicSemecterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademiSemester = {
  title: IAcademicSemesterTitle;
  year: number;
  code: IAcademicSemesterCode;
  startMonth: academicSemecterMonth;
  endMonth: academicSemecterMonth;
};
export type AcademicSemesterModel = Model<IAcademiSemester>;
