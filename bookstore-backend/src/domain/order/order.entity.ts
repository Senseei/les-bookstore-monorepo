import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { CustomerDetails } from '../user/customer-details.entity';
import { OrderItem } from './order-item.entity';
import { PaymentStatus } from './payment/enums/payment-status.enum';
import { Payment } from './payment/payment.entity';
import { OrderStatus } from './status.enum';

@Entity('tb_orders')
export class Order extends DomainEntity {
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
    cascade: true,
  })
  _items: OrderItem[];

  @Column()
  orderDate: Date = new Date();

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @OneToMany(() => Payment, (payment) => payment.order, {
    eager: true,
    cascade: true,
  })
  _payments: Payment[];

  @ManyToOne(() => CustomerDetails, (customer) => customer.orders)
  @JoinColumn()
  customer: CustomerDetails;

  constructor(customer: CustomerDetails) {
    super();
    if (customer) {
      this.customer = customer;
    }
  }

  get items(): OrderItem[] {
    if (!this._items) {
      this._items = [];
    }
    return this._items;
  }

  get payments(): Payment[] {
    if (!this._payments) {
      this._payments = [];
    }
    return this._payments;
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

  public getSuccessfulPayments(): Payment[] {
    return this.payments.filter((p) => p.status === PaymentStatus.SUCCEEDED);
  }

  public getTotalPaid(): number {
    return (
      this.getSuccessfulPayments().reduce(
        (sum, p) => sum + p.amountInCents,
        0,
      ) / 100
    );
  }

  public isFullyPaid(): boolean {
    return this.getTotalPaid() >= this.getTotalPrice();
  }

  public getRemainingBalance(): number {
    return Math.max(0, this.getTotalPrice() - this.getTotalPaid());
  }

  public getPaymentsByCard(cardId: string): Payment[] {
    return this.payments.filter((p) => p.card?.id === cardId);
  }
}
