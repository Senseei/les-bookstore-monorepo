import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { UsersService } from '@application/users/services';
import { Address } from '@domain/user/address.entity';
import { Injectable } from '@nestjs/common';
import { UpdateAddressDTO } from '@presentation/site/users/dtos';

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
