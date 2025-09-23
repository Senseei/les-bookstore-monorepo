import { InvalidBodyException } from '@application/exceptions/invalid-body.exception';
import { Address } from '@domain/user/address.entity';
import { AddressPurpose } from '@domain/user/enums/address-purpose.enum';
import { Injectable } from '@nestjs/common';

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
  validateAddressRemoval(addresses: Address[], addressToRemove: Address): void {
    const remainingAddresses = addresses.filter(
      (address) => address.id !== addressToRemove.id,
    );

    // Verifica se após a remoção ainda haverá os endereços obrigatórios
    const willHaveBillingAddress = remainingAddresses.some(
      (address) =>
        address.purpose === AddressPurpose.BILLING ||
        address.purpose === AddressPurpose.BOTH,
    );

    const willHaveDeliveryAddress = remainingAddresses.some(
      (address) =>
        address.purpose === AddressPurpose.DELIVERY ||
        address.purpose === AddressPurpose.BOTH,
    );

    const errors: string[] = [];

    // Verifica se o endereço a ser removido é necessário para cobrança
    const isRequiredForBilling =
      addressToRemove.purpose === AddressPurpose.BILLING ||
      addressToRemove.purpose === AddressPurpose.BOTH;

    // Verifica se o endereço a ser removido é necessário para entrega
    const isRequiredForDelivery =
      addressToRemove.purpose === AddressPurpose.DELIVERY ||
      addressToRemove.purpose === AddressPurpose.BOTH;

    if (!willHaveBillingAddress && isRequiredForBilling) {
      errors.push(
        'Não é possível remover o último endereço de cobrança. Cadastre outro endereço de cobrança antes de remover este.',
      );
    }

    if (!willHaveDeliveryAddress && isRequiredForDelivery) {
      errors.push(
        'Não é possível remover o último endereço de entrega. Cadastre outro endereço de entrega antes de remover este.',
      );
    }

    if (errors.length > 0) {
      throw new InvalidBodyException(errors.join(' '));
    }
  }
}
