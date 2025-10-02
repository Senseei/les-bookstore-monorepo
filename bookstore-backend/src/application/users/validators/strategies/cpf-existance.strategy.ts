import { UsersService } from '@application/users/services';
import { Injectable } from '@nestjs/common';
import { NewUserDTO } from '@presentation/auth/dtos/new-user.dto';
import { UpdateUserDTO } from '@presentation/site/users/dtos';

import { DuplicatedEntityException } from '@/application/exceptions';

import { UserValidationStrategy } from './user.strategy';

@Injectable()
export class CpfExistenceStrategy implements UserValidationStrategy {
  constructor(private readonly usersService: UsersService) {}

  public async validate(
    dto: NewUserDTO | UpdateUserDTO,
    userId?: string,
  ): Promise<void> {
    const existingUser = await this.usersService.findByCpf(dto.cpf);
    if (existingUser && existingUser.id !== userId) {
      throw new DuplicatedEntityException('CPF already in use');
    }
  }
}
