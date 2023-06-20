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

//==============update semester validation security==========
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is Required.....',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required.',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]], {
          required_error: 'code is require..',
        })
        .optional(),
      startMonth: z
        .enum([...accademicSemesterMonth] as [string, ...string[]], {
          required_error: 'StartMonth is Required..',
        })
        .optional(),

      endMonth: z
        .enum([...accademicSemesterMonth] as [string, ...string[]], {
          required_error: 'endMonth is Required..',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message:
        'Either you can give two values title or code never change anothers one.. ',
    }
  );

export const AcademicSemesterValidation = {
  createAcademiSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
