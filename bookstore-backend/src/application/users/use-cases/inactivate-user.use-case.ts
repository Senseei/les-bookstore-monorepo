import { Injectable } from '@nestjs/common';

import { BaseService } from '@application/base.service';
import { User } from '@domain/user.entity';
import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';

import { UsersRepository } from '../users.repository';

@Injectable()
export class InactivateUserUseCase extends BaseService<User> {
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }

  async execute(userId: string): Promise<User> {
    // Buscar o usuário
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new EntityNotFoundException('User', userId);
    }

    // Verificar se o usuário já está inativo
    if (!user.active) {
      throw new Error('User is already inactive');
    }

    // Inativar o usuário
    user.inactivate();

    // Salvar as mudanças
    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}
