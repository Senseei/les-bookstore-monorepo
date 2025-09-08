import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { AddressService } from './address.service';
import { AddressValidator } from '../validators/address.validator';

@Injectable()
export class RemoveUserAddress {
  constructor(
    private readonly addressService: AddressService,
    private readonly addressValidator: AddressValidator,
  ) {}

  async execute(userId: string, addressId: string): Promise<void> {
    // Buscar o endereço do usuário
    const address = await this.addressService.findByUserIdAndAddressId(
      userId,
      addressId,
    );

    if (!address) {
      throw new EntityNotFoundException('Address', addressId);
    }

    // Buscar todos os endereços do usuário
    const userAddresses = await this.addressService.findByUserId(userId);

    // Validar se a remoção não viola as regras de negócio RN0021 e RN0022
    this.addressValidator.validateAddressRemoval(userAddresses, address);

    // Remover o endereço
    await this.addressService.deleteByUserIdAndAddressId(userId, addressId);
  }
}
