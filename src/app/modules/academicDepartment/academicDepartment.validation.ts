import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Requeired...',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Department is required..',
    }),
  }),
});
const updateAcademicDepartmentZodSchema = z.object({
  /// update faculty zod schemma
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
