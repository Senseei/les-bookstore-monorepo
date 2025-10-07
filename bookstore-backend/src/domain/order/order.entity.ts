import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { CustomerDetails } from '../user/customer-details.entity';
import { OrderItem } from './order-item.entity';

@Entity('tb_orders')
export class Order extends DomainEntity {
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
    cascade: true,
  })
  _items: OrderItem[];

  @ManyToOne(() => CustomerDetails, (customer) => customer.orders)
  @JoinColumn()
  customer: CustomerDetails;

  @Column()
  orderDate: Date = new Date();

  get items(): OrderItem[] {
    if (!this._items) {
      this._items = [];
    }
    return this._items;
  }

  public getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  public getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  public addItem(item: OrderItem): void {
    const existingItem = this.items.find((i) => i.equals(item));
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  public removeItem(item: OrderItem): void {
    this._items = this.items.filter((i) => !i.equals(item));
  }
}
