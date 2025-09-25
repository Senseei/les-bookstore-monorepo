import { HttpStatus } from '@nestjs/common';

import { CustomException } from './custom.exception';

export class UnactiveException extends CustomException {
  constructor(entityName: string, entityId: string) {
    super(
      `${entityName} with ID ${entityId} is inactive`,
      HttpStatus.FORBIDDEN,
    );
  }
}
