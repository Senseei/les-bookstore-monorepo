import { Injectable } from '@nestjs/common';
import { Address } from '@domain/address.entity';
import { AddressService } from './address.service';
import { UsersService } from './users.service';

@Injectable()
export class GetUserAddresses {
  constructor(
    private readonly addressService: AddressService,
    private readonly usersService: UsersService,
  ) {}

  async execute(userId: string): Promise<Address[]> {
    await this.usersService.findByIdOrThrow(userId);
    return await this.addressService.findByUserId(userId);
  }
}
