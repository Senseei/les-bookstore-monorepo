import { DomainEntity } from '@domain/domain.entity';
import { Entity, OneToMany, OneToOne } from 'typeorm';

import { Address } from './address.entity';
import { User } from './user.entity';

@Entity('tb_customer_details')
export class CustomerDetails extends DomainEntity {
  @OneToOne(() => User, (user) => user.customerDetails)
  user: User;

  @OneToMany(() => Address, (address) => address.customerDetails, {
    cascade: true,
    eager: true,
  })
  addresses: Address[];

  constructor(props: any) {
    super();
    if (props) {
      this.addresses = [];
    }
  }

  public update(props: any): void {
    throw new Error('Method not implemented.');
  }

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
