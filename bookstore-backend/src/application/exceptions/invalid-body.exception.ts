import { HttpStatus } from '@nestjs/common';

import { CustomException } from './custom.exception';

export class InvalidBodyException extends CustomException {
  constructor(message: string, errors?: Record<string, string[]>) {
    super(message, HttpStatus.BAD_REQUEST, { errors });
  }
}
