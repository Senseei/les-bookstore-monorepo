import { DuplicatedEntityException } from '@application/exceptions/duplicated-entity.exception';
import { Address } from '@domain/user/address.entity';
import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from '@presentation/users/dtos/create-address.dto';

import { UsersService } from '../services';

@Injectable()
export class AddUserAddress {
  constructor(private readonly usersService: UsersService) {}

  async execute(userId: string, dto: CreateAddressDTO): Promise<Address> {
    const user = await this.usersService.findActiveByIdOrThrow(userId);

    // Criar novo endereço
    const address = new Address({
      type: dto.type,
      purpose: dto.purpose,
      addressName: dto.addressName,
      postalCode: dto.postalCode,
      street: dto.street,
      number: dto.number,
      complement: dto.complement,
      district: dto.district,
      city: dto.city,
      state: dto.state,
    });

    if (user.customerDetails.hasAddress(address)) {
      throw new DuplicatedEntityException('Address already exists.');
    }

    user.customerDetails.addresses.push(address);

    // Salvar usuário com o novo endereço
    await this.usersService.save(user);

    return user.customerDetails.addresses.find((a) => a.equals(address))!;
  }
}
