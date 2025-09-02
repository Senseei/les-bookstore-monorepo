import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@domain/user.entity';
import { Repository } from 'typeorm';
import { CRUDRepository } from '@infrastructure/persistence/typeorm/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@application/users/users.repository';

@Injectable()
export class UsersRepositoryImpl
  extends CRUDRepository<User>
  implements UsersRepository
{
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    return await this.repository.findOneBy({ cpf });
  }
}
