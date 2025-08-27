import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    extraFields?: Record<string, any>,
  ) {
    super({ ...extraFields, message }, status);
  }
}
