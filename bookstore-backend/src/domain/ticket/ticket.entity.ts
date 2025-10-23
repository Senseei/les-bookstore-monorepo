import { Column, Entity } from 'typeorm';

import { DecimalColumn } from '../decorators/decimal-column.decorator';
import { DomainEntity } from '../domain.entity';
import { InvalidInitializationException } from '../exceptions/invalid-initialization.exception';
import { TicketType } from './enums/ticket-type.enum';

@Entity('tb_tickets')
export class Ticket extends DomainEntity {
  @Column()
  code: string;

  @DecimalColumn()
  value: number;

  @Column({
    type: 'enum',
    enum: TicketType,
  })
  type: TicketType;

  @Column({ nullable: true })
  validUntil?: Date;

  @Column({ nullable: true })
  description?: string;

  @DecimalColumn({ nullable: true })
  maxDiscount?: number;

  constructor(props: {
    code: string;
    value: number;
    type: TicketType;
    validUntil?: Date;
    description?: string;
    maxDiscount?: number;
  }) {
    super();
    if (props) {
      this.code = props.code;
      this.value = this.validateValue(props.value, props.type);
      this.type = props.type;
      this.validUntil = props.validUntil;
      this.description = props.description;
      this.maxDiscount = props.maxDiscount;
    }
  }

  private validateValue(value: number, type: TicketType): number {
    switch (type) {
      case TicketType.PERCENTAGE:
        if (value < 0 || value > 100) {
          throw new InvalidInitializationException(
            'Percentage ticket value must be between 0 and 100',
          );
        }
        break;
      case TicketType.RAW:
        if (value < 0) {
          throw new InvalidInitializationException(
            'Raw ticket value must be greater than or equal to 0',
          );
        }
        break;
      default:
        throw new InvalidInitializationException('Invalid ticket type');
    }
    return value;
  }

  public applyTicket(value: number): number {
    let discount: number;
    switch (this.type) {
      case TicketType.PERCENTAGE:
        discount = (value * this.value) / 100;
        break;
      case TicketType.RAW:
        discount = this.value;
        break;
    }
    return this.maxDiscount ? Math.min(discount, this.maxDiscount) : discount;
  }
}
