import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { OrderItem } from './order-item.entity';
import { Refund } from './refund.entity';

@Entity('tb_refund_items')
export class RefundItem extends DomainEntity {
  @ManyToOne(() => Refund)
  @JoinColumn()
  refund: Refund;

  @ManyToOne(() => OrderItem)
  @JoinColumn()
  orderItem: OrderItem;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  constructor(props: {
    orderItem: OrderItem;
    quantity: number;
    unitPrice: number;
  }) {
    super();
    if (props) {
      this.orderItem = props.orderItem;
      this.quantity = props.quantity;
      this.unitPrice = props.unitPrice;
    }
  }

  public getTotalPrice(): number {
    return this.quantity * this.unitPrice;
  }
}
