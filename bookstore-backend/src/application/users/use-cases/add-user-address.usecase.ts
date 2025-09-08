import { Injectable } from '@nestjs/common';
import { Address } from '@domain/address.entity';
import { CreateAddressDTO } from '@presentation/users/dtos/create-address.dto';
import { AddressService } from './address.service';
import { UsersService } from './users.service';

@Injectable()
export class AddUserAddress {
  constructor(
    private readonly addressService: AddressService,
    private readonly usersService: UsersService,
  ) {}

  async execute(userId: string, dto: CreateAddressDTO): Promise<Address> {
    // Verificar se o usuário existe
    const user = await this.usersService.findByIdOrThrow(userId);

    // Criar novo endereço
    const address = new Address({
      type: dto.type,
      addressName: dto.addressName,
      postalCode: dto.postalCode,
      street: dto.street,
      number: dto.number,
      complement: dto.complement,
      district: dto.district,
      city: dto.city,
      state: dto.state,
    });

    // Associar o endereço ao usuário
    address.user = user;

    // Salvar o endereço
    return await this.addressService.save(address);
  }
}
