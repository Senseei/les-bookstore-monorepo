import { InvalidBodyException } from '@application/exceptions/invalid-body.exception';
import { Address } from '@domain/user/address.entity';
import { AddressPurpose } from '@domain/user/enums/address-purpose.enum';
import { Injectable } from '@nestjs/common';

// TODO, mover para uma strategy
@Injectable()
export class AddressValidator {
  validateRequiredAddressTypes(addresses: Address[]): void {
    const hasBillingAddress = addresses.some(
      (address) =>
        address.purpose === AddressPurpose.BILLING ||
        address.purpose === AddressPurpose.BOTH,
    );

    const hasDeliveryAddress = addresses.some(
      (address) =>
        address.purpose === AddressPurpose.DELIVERY ||
        address.purpose === AddressPurpose.BOTH,
    );

    const errors: string[] = [];

    if (!hasBillingAddress) {
      errors.push(
        'É obrigatório cadastrar pelo menos um endereço de cobrança.',
      );
    }

    if (!hasDeliveryAddress) {
      errors.push('É obrigatório cadastrar pelo menos um endereço de entrega.');
    }

    if (errors.length > 0) {
      throw new InvalidBodyException(errors.join(' '));
    }
  }

  /**
   * Valida se pode remover um endereço sem violar as regras de negócio
   */
}
