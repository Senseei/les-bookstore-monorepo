import { HttpStatus } from '@nestjs/common';
import { CustomException } from '@application/exceptions/custom.exception';

export class UserInactiveException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
