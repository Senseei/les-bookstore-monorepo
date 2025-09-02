import { HttpStatus } from '@nestjs/common';

import { CustomException } from '@common/exceptions/custom.exception';

export class InvalidCredentialsException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
