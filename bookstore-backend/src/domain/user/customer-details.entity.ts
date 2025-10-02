import { DomainEntity } from '@domain/domain.entity';
import { Entity, OneToMany, OneToOne } from 'typeorm';

import { Address } from './address.entity';
import { Card } from './card.entity';
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

  @OneToMany(() => Card, (card) => card.customerDetails, {
    cascade: true,
    eager: true,
  })
  cards: Card[];

  constructor(props: any) {
    super();
    if (props) {
      this.addresses = [];
      this.cards = [];
    }
  }

  public override update(props: any): void {
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

  public hasCard(card: Card): boolean;
  public hasCard(cardNumber: string): boolean;

  public hasCard(card: Card | string): boolean {
    if (typeof card === 'string') {
      return this.cards.some((c) => c.number === card);
    }
    return this.cards.some((c) => c.equals(card));
  }

  public getCard(identifier: string): Card | undefined {
    return this.cards.find(
      (c) => c.number === identifier || c.id === identifier,
    );
  }
}
