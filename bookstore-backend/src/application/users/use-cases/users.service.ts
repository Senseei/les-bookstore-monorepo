import { BaseService } from '@application/base.service';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@domain/user.entity';
import { UsersRepository } from '@application/users/users.repository';
import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { UserInactiveException } from '@application/exceptions/user-inactive.exception';

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

  /**
   * Busca um usuário por ID, verificando se está ativo
   */
  public async findActiveUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findActiveById(id);

    if (!user) {
      // Verificar se o usuário existe mas está inativo
      const inactiveUser = await this.usersRepository.findById(id);
      if (inactiveUser && !inactiveUser.active) {
        throw new UserInactiveException('User account has been deactivated');
      }
      throw new EntityNotFoundException('User', id);
    }

    return user;
  }

  /**
   * Atualiza um usuário, verificando se está ativo
   */
  public async updateActiveUser(
    id: string,
    updateData: Partial<User>,
  ): Promise<User> {
    const user = await this.findActiveUserById(id);

    // Aplicar as atualizações
    Object.assign(user, updateData);

    return await this.save(user);
  }
}
