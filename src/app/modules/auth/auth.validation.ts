import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    id: z.string({
      required_error: 'refresh token is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
