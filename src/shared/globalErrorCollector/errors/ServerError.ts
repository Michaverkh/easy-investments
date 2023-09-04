import { ValidationError as YupValidationError } from 'yup';
export class ServerError {
  constructor(exception: YupValidationError, url?: string) {
    const err = new ErrorEvent('error', {
      error: this,
      message: 'Server Error',
    });
    dispatchEvent(err);
  }
}
