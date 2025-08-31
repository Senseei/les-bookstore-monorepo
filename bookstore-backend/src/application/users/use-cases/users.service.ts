import { BaseService } from '@application/base.service';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@domain/user.entity';
import { UsersRepository } from '@application/users/users.repository';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {
    super(usersRepository);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}
