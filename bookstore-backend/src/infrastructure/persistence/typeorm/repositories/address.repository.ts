import { AddressesRepository } from '@application/users/address.repository';
import { Address } from '@domain/user/address.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CRUDRepository } from './base.repository';

@Injectable()
export class AddressessRepositoryImpl
  extends CRUDRepository<Address>
  implements AddressesRepository
{
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {
    super(addressRepository);
  }

  async findByUserId(userId: string): Promise<Address[]> {
    return this.addressRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findByUserIdAndAddressId(
    userId: string,
    addressId: string,
  ): Promise<Address | null> {
    return this.addressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
      relations: ['user'],
    });
  }

  async deleteByUserIdAndAddressId(
    userId: string,
    addressId: string,
  ): Promise<void> {
    await this.addressRepository.delete({
      id: addressId,
      user: { id: userId },
    });
  }
}
