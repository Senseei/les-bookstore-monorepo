import { CustomException } from '@application/exceptions/custom.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
