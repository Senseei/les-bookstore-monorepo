import { HttpStatus } from '@nestjs/common';

import { CustomException } from './custom.exception';

export class DuplicatedEntityException extends CustomException {
  constructor(message: string) {
    super(message || 'Entity already exists.', HttpStatus.CONFLICT);
  }
}
