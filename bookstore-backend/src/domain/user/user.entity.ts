import { Gender } from '@domain/user/enums/gender.enum';
import { Column, Entity, OneToOne } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { CustomerDetails } from './customer-details.entity';

@Entity('tb_users')
export class User extends DomainEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  birthDate: Date;

  @Column()
  password: string;

  @OneToOne(() => CustomerDetails, { cascade: true, eager: true })
  customerDetails: CustomerDetails;

  constructor(props: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    gender: Gender;
    birthDate: Date;
  }) {
    super();
    if (props) {
      this.name = props.name;
      this.email = props.email;
      this.cpf = props.cpf;
      this.phone = props.phone;
      this.password = props.password;
      this.gender = props.gender;
      this.birthDate = props.birthDate;
      this.customerDetails = new CustomerDetails();
    }
  }

  public override update(props: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    gender: Gender;
    birthDate: Date;
  }) {
    this.name = props.name;
    this.email = props.email;
    this.cpf = props.cpf;
    this.phone = props.phone;
    this.gender = props.gender;
    this.birthDate = props.birthDate;
  }
}
