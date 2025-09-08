import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { CustomException } from '@application/exceptions/custom.exception';
import { AddressType } from '@domain/enums/address-type.enum';
import { HttpStatus } from '@nestjs/common';
import { AddressService } from './address.service';

@Injectable()
export class RemoveUserAddress {
  constructor(private readonly addressService: AddressService) {}

  async execute(userId: string, addressId: string): Promise<void> {
    // Buscar o endereço do usuário
    const address = await this.addressService.findByUserIdAndAddressId(
      userId,
      addressId,
    );

    if (!address) {
      throw new EntityNotFoundException('Address', addressId);
    }

    // Verificar se não é o último endereço residencial
    if (address.type === AddressType.HOUSE) {
      const userAddresses = await this.addressService.findByUserId(userId);
      const residentialAddresses = userAddresses.filter(
        (addr) => addr.type === AddressType.HOUSE,
      );

      if (residentialAddresses.length === 1) {
        throw new CustomException(
          'Cannot delete the last residential address',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Remover o endereço
    await this.addressService.deleteByUserIdAndAddressId(userId, addressId);
  }
}
