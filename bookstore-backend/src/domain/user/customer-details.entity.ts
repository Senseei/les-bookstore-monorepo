import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Address } from './address.entity';
import { User } from './user.entity';

@Entity('tb_customer_details')
export class CustomerDetails {
  @OneToOne(() => User, (user) => user.customerDetails)
  @JoinColumn()
  user: User;

  @OneToMany(() => Address, (address) => address.customerDetails, {
    cascade: true,
  })
  addresses: Address[];

  public hasAddress(address: Address): boolean;
  public hasAddress(addressId: string): boolean;

  public hasAddress(address: Address | string): boolean {
    if (typeof address === 'string') {
      return this.addresses.some((a) => a.id === address);
    }
    return this.addresses.some((a) => a.equals(address));
  }

  public getAddress(addressId: string): Address | undefined {
    return this.addresses.find((a) => a.id === addressId);
  }
}
