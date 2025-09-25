import { CustomException } from '@application/exceptions';
import { HttpStatus } from '@nestjs/common';

export class CannotRemoveAddressException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
