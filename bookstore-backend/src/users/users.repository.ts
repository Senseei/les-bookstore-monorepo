import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CRUDRepository } from '@common/common.repository';

export class UsersRepository extends CRUDRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }
}
