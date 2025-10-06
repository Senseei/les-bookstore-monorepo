import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DomainEntity } from '../domain.entity';
import { Order } from './order.entity';
import { Book } from '../book.entity';

@Entity('tb_order_items')
export class OrderItem extends DomainEntity {
  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Book)
  @JoinColumn()
  book: Book;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  constructor(props: {
    book: Book;
    quantity: number;
    unitPrice: number;
  }) {
    super();
    if (props) {
      this.book = props.book;
      this.quantity = props.quantity;
      this.unitPrice = props.unitPrice;
      this.subtotal = props.quantity * props.unitPrice;
    }
  }

  public override update(props: any): void {
    if (props.quantity) {
      this.quantity = props.quantity;
      this.subtotal = this.quantity * this.unitPrice;
    }
  }

  public override equals(other: OrderItem): boolean {
    return this.id === other.id;
  }
}