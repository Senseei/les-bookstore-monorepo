import { Injectable } from '@nestjs/common';
import { Address } from '@domain/address.entity';
import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { UpdateAddressDTO } from '@presentation/users/dtos/update-address.dto';
import { AddressService } from './address.service';

@Injectable()
export class UpdateUserAddress {
  constructor(private readonly addressService: AddressService) {}

  async execute(
    userId: string,
    addressId: string,
    dto: UpdateAddressDTO,
  ): Promise<Address> {
    // Buscar o endereço do usuário
    const address = await this.addressService.findByUserIdAndAddressId(
      userId,
      addressId,
    );

    if (!address) {
      throw new EntityNotFoundException('Address', addressId);
    }

    // Atualizar apenas os campos fornecidos
    const updateData = {
      type: dto.type ?? address.type,
      addressName: dto.addressName ?? address.addressName,
      postalCode: dto.postalCode ?? address.postalCode,
      street: dto.street ?? address.street,
      number: dto.number ?? address.number,
      complement: dto.complement ?? address.complement,
      district: dto.district ?? address.district,
      city: dto.city ?? address.city,
      state: dto.state ?? address.state,
    };

    // Aplicar as atualizações
    address.update(updateData);

    // Salvar as mudanças
    return await this.addressService.save(address);
  }
}
