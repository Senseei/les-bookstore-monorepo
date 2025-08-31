import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@domain/user.entity';
import { Repository } from 'typeorm';
import { CRUDRepository } from '@infrastructure/persistence/typeorm/repositories/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepositoryImpl extends CRUDRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }
}
