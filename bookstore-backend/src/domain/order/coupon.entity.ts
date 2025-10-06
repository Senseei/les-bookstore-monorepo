import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DomainEntity } from '../domain.entity';
import { User } from '../user/user.entity';
import { CouponType } from './enums/coupon-type.enum';

@Entity('tb_coupons')
export class Coupon extends DomainEntity {
  @Column({ unique: true })
  code: string;

  @Column({ type: 'enum', enum: CouponType })
  type: CouponType;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  customer: User;

  @Column({ type: 'date', nullable: true })
  expiresAt: Date;

  @Column({ default: false })
  used: boolean;

  @Column({ type: 'date', nullable: true })
  usedAt: Date;

  constructor(props: {
    code: string;
    type: CouponType;
    value: number;
    customer?: User;
    expiresAt?: Date;
  }) {
    super();
    if (props) {
      this.code = props.code;
      this.type = props.type;
      this.value = props.value;
      this.customer = props.customer;
      this.expiresAt = props.expiresAt;
      this.used = false;
    }
  }

  public markAsUsed(): void {
    this.used = true;
    this.usedAt = new Date();
  }

  public isValid(): boolean {
    if (this.used) return false;
    if (this.expiresAt && new Date() > this.expiresAt) return false;
    return true;
  }

  public override update(props: any): void {
    throw new Error('Coupons cannot be updated');
  }

  public override equals(other: Coupon): boolean {
    return this.code === other.code;
  }
}