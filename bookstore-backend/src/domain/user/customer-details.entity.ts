import { Entity, OneToMany } from 'typeorm';

import { Address } from './address.entity';

@Entity('tb_customer_details')
export class CustomerDetails {
  @OneToMany(() => Address, (address) => address.customerDetails, {
    cascade: true,
    eager: true,
  })
  addresses: Address[];

  public hasAddress(address: Address): boolean {
    return this.addresses.some((a) => a.equals(address));
  }
}
