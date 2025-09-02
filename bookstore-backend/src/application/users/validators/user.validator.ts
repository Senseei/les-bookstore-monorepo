import { UserValidationStrategy } from './strategies/user.strategy';
import { Inject } from '@nestjs/common';
import { NewUserDTO } from '@presentation/auth/dtos/new-user.dto';
import { UpdateUserDTO } from '@presentation/users/dtos/update-user.dto';

export class UserValidator {
  constructor(
    @Inject('UserValidationStrategies')
    private readonly strategies: UserValidationStrategy[],
  ) {}

  public async validate(
    dto: NewUserDTO | UpdateUserDTO,
    userId?: string,
  ): Promise<void> {
    await Promise.all(
      this.strategies.map((strategy) => strategy.validate(dto, userId)),
    );
  }
}
