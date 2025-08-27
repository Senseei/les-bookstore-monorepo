import { Column, Entity, Unique } from 'typeorm';
import { DomainEntity } from '@common/domain.entity';

@Entity('tb_users')
@Unique(['email'])
export class User extends DomainEntity {
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;

  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
