import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DomainEntity } from '../domain.entity';
import { User } from '../user/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './enums/order-status.enum';
import { Address } from '../user/address.entity';

@Entity('tb_orders')
export class Order extends DomainEntity {
  @Column()
  orderNumber: string;

  @ManyToOne(() => User)
  @JoinColumn()
  customer: User;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  shipping: number;

  @Column('decimal', { precision: 10, scale: 2 })
  discount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Address)
  @JoinColumn()
  shippingAddress: Address;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'json', nullable: true })
  paymentDetails: {
    cards?: Array<{
      cardId: string;
      amount: number;
    }>;
    exchangeCoupons?: Array<{
      couponCode: string;
      amount: number;
    }>;
    promotionalCoupon?: {
      couponCode: string;
      discount: number;
    };
  };

  constructor(props: {
    customer: User;
    shippingAddress: Address;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
  }) {
    super();
    if (props) {
      this.customer = props.customer;
      this.shippingAddress = props.shippingAddress;
      this.subtotal = props.subtotal;
      this.shipping = props.shipping;
      this.discount = props.discount;
      this.total = props.total;
      this.orderNumber = this.generateOrderNumber();
      this.status = OrderStatus.PROCESSING;
    }
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  }

  public override update(props: any): void {
    throw new Error('Orders cannot be updated directly');
  }

  public override equals(other: Order): boolean {
    return this.id === other.id;
  }

  public updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }
}