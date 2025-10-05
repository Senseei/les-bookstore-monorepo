import { UsersService } from '@application/users/services';
import { Address } from '@domain/user/address.entity';
import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from '@presentation/site/users/dtos';

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

    if (!user.customerDetails.hasAddress(address)) {
      user.customerDetails.addresses.push(address);
      await this.usersService.save(user);
    }

    return user.customerDetails.addresses.find((a) => a.equals(address));
  }
}
