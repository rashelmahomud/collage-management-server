import {
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
  academicSemecterMonth,
} from './academicSemester.interface';

export const academicSemesterTitles: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];

export const accademicSemesterMonth: academicSemecterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const adcademicSemesterSearchAbleFields = ['title', 'code', 'year'];
export const academicSemesterFilterAbleFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];

export type IAcademiSemesterFilters = {
  searchTerm?: string;
};

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
