import { CommonService } from '@common/common.service';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends CommonService<User> {
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}
