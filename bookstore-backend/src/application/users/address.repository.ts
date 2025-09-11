import { Address } from '@domain/address.entity';
import { BaseRepository } from '@application/base.repository';

export interface AddressesRepository extends BaseRepository<Address> {
  findByUserId(userId: string): Promise<Address[]>;
  findByUserIdAndAddressId(
    userId: string,
    addressId: string,
  ): Promise<Address | null>;
  deleteByUserIdAndAddressId(userId: string, addressId: string): Promise<void>;
}
