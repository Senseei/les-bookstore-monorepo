import { Column, Entity, OneToMany } from 'typeorm';
import { DomainEntity } from './domain.entity';
import { Address } from './address.entity';
import { Gender } from '@domain/enums/gender.enum';

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

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
    eager: true,
  })
  addresses: Address[];

  @Column()
  password: string;

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
      this.addresses = [];
    }
  }

  public hasAddress(address: Address): boolean {
    return this.addresses.some((a) => a.equals(address));
  }
}
