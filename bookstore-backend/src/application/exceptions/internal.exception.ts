import { HttpStatus } from '@nestjs/common';

import { CustomException } from './custom.exception';

export class InternalException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
