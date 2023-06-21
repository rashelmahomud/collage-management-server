import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Requeired...',
    }),
  }),
});
const updateFacultyZodSchema = z.object({
  /// update faculty zod schemma
  body: z.object({
    title: z.string({
      required_error: 'Title is Requeired...',
    }),
  }),
});

export const academicFacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
};

// await createUserZodSchema.parseAsync(req)
