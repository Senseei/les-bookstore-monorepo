import { BaseService } from '@application/base.service';
import { AddressesRepository } from '@application/users/address.repository';
import { Address } from '@domain/user/address.entity';
import { Inject, Injectable } from '@nestjs/common';

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
