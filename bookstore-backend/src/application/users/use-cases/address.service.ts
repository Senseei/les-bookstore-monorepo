import { BaseService } from '@application/base.service';
import { Inject, Injectable } from '@nestjs/common';
import { Address } from '@domain/address.entity';
import { AddressesRepository } from '@application/users/address.repository';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(
    @Inject('AddressesRepository')
    private readonly repository: AddressesRepository,
  ) {
    super(repository);
  }

  public async findByUserId(userId: string): Promise<Address[]> {
    return this.repository.findByUserId(userId);
  }

  public async findByUserIdAndAddressId(
    userId: string,
    addressId: string,
  ): Promise<Address | null> {
    return this.repository.findByUserIdAndAddressId(userId, addressId);
  }

  public async deleteByUserIdAndAddressId(
    userId: string,
    addressId: string,
  ): Promise<void> {
    return this.repository.deleteByUserIdAndAddressId(userId, addressId);
  }
}
