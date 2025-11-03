import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { RefundStatus } from './enums/refund-status.enum';
import { Order } from './order.entity';
import { RefundItem } from './refund-item.entity';

@Entity('tb_refunds')
export class Refund extends DomainEntity {
  @ManyToOne(() => Order)
  @JoinColumn()
  order: Order;

  @OneToMany(() => RefundItem, (refundItem) => refundItem.refund, {
    eager: true,
    cascade: true,
  })
  items: RefundItem[];

  @Column()
  requestDate: Date = new Date();

  @Column({ type: 'enum', enum: RefundStatus })
  status: RefundStatus = RefundStatus.REQUESTED;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @Column({ nullable: true })
  processedAt?: Date;

  constructor(props: { order: Order; items: RefundItem[]; reason?: string }) {
    super();
    if (props) {
      this.order = props.order;
      this.items = props.items;
      this.reason = props.reason;
      this.totalAmount = this.calculateTotalAmount();
    }
  }

  private calculateTotalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }

  public approve(): void {
    if (this.status !== RefundStatus.REQUESTED) {
      throw new Error('Only requested refunds can be approved');
    }
    this.status = RefundStatus.APPROVED;
  }

  public reject(): void {
    if (this.status !== RefundStatus.REQUESTED) {
      throw new Error('Only requested refunds can be rejected');
    }
    this.status = RefundStatus.REJECTED;
  }

  public complete(): void {
    if (this.status !== RefundStatus.APPROVED) {
      throw new Error('Only approved refunds can be completed');
    }
    this.status = RefundStatus.COMPLETED;
    this.processedAt = new Date();
  }
}
