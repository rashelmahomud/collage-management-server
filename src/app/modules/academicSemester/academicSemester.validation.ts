import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterTitles,
  accademicSemesterMonth,
} from './academicSemester.constent';

const createAcademiSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),

    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...accademicSemesterMonth] as [string, ...string[]], {
      required_error: 'Start Month is Required',
    }),
    endMonth: z.enum([...accademicSemesterMonth] as [string, ...string[]], {
      required_error: 'End Month is Required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademiSemesterZodSchema,
};
