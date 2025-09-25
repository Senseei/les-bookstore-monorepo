import { BaseService } from '@application/base.service';
import { UsersRepository } from '@application/users/users.repository';
import { User } from '@domain/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';

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

  public async findByCpf(cpf: string): Promise<User | null> {
    return this.usersRepository.findByCpf(cpf);
  }
}
