import mongoose from 'mongoose'
import { IGenericErrorResponce } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handelValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponce => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )

  const statusCode = 500
  return {
    statusCode,
    message: 'validation Error',
    errorMessage: errors,
  }
}

export default handelValidationError
