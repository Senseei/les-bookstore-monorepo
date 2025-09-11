import { Injectable } from '@nestjs/common';
import { Address } from '@domain/address.entity';
import { AddressService } from './address.service';

@Injectable()
export class GetUserAddresses {
  constructor(private readonly addressService: AddressService) {}

  async execute(userId: string): Promise<Address[]> {
    return await this.addressService.findByUserId(userId);
  }
}
