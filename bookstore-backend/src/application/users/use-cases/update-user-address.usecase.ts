import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { Address } from '@domain/user/address.entity';
import { Injectable } from '@nestjs/common';
import { UpdateAddressDTO } from '@presentation/users/dtos/update-address.dto';

import { AddressService } from '../services';

@Injectable()
export class UpdateUserAddress {
  constructor(private readonly addressService: AddressService) {}

  async execute(
    userId: string,
    addressId: string,
    dto: UpdateAddressDTO,
  ): Promise<Address> {
    // Buscar o endereço do usuário
    // TODO REFATORAR, NAO FAZ SENTIDO BUSCAR POR 2 IDS
    const address = await this.addressService.findByUserIdAndAddressId(
      userId,
      addressId,
    );

    if (!address) {
      throw new EntityNotFoundException('Address', addressId);
    }

    // Aplicar as atualizações
    address.update(dto);

    // Salvar as mudanças
    return await this.addressService.save(address);
  }
}
