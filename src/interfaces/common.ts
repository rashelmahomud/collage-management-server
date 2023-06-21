import { IGenericErrorMessage } from './error';

export type IGenericResponce<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponce = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
