import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { Address } from '@domain/user/address.entity';
import { Injectable } from '@nestjs/common';
import { UpdateAddressDTO } from '@presentation/users/dtos/update-address.dto';

import { UsersService } from '../services';

@Injectable()
export class UpdateUserAddress {
  constructor(private readonly usersService: UsersService) {}

  async execute(
    userId: string,
    addressId: string,
    dto: UpdateAddressDTO,
  ): Promise<Address> {
    const user = await this.usersService.findActiveByIdOrThrow(userId);

    const address = user.customerDetails.getAddress(addressId);

    if (!address) {
      throw new EntityNotFoundException('Address', addressId);
    }

    address.update(dto);

    await this.usersService.save(user);
    return address;
  }
}
