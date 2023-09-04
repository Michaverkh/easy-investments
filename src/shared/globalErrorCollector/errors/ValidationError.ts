import { ValidationError as YupValidationError } from 'yup';
export class ValidationError {
  constructor(exception: YupValidationError, url?: string) {
    const err = new ErrorEvent('error', {
      error: this,
      message: 'Validation Error',
    });
    dispatchEvent(err);
  }
}
