import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entityName: string, entityId: number | string) {
    const message = `${entityName} with ID ${entityId} not found`;
    super(message, HttpStatus.NOT_FOUND);
  }
}
