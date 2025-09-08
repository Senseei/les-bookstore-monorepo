import { Injectable } from '@nestjs/common';
import { User } from '@domain/user.entity';
import { AddressValidator } from './address.validator';

@Injectable()
export class UserWithAddressValidator {
  constructor(private readonly addressValidator: AddressValidator) {}

  /**
   * Valida se o usuário atende as regras RN0021 e RN0022
   */
  validate(user: User): void {
    this.addressValidator.validateRequiredAddressTypes(user.addresses);
  }
}
