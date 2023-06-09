import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponce } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handelZodError = (error: ZodError): IGenericErrorResponce => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Error Validation',
    errorMessage: errors,
  };
};

export default handelZodError;
