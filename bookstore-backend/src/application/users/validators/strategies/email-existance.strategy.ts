import { UsersService } from '@application/users/use-cases/users.service';
import { UserValidationStrategy } from './user.strategy';
import { UpdateUserDTO } from '@presentation/users/dtos/update-user.dto';
import { NewUserDTO } from '@presentation/auth/dtos/new-user.dto';
import { InvalidBodyException } from '@application/exceptions/invalid-body.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailExistenceStrategy implements UserValidationStrategy {
  constructor(private readonly usersService: UsersService) {}

  public async validate(
    dto: NewUserDTO | UpdateUserDTO,
    userId?: string,
  ): Promise<void> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser && existingUser.id !== userId) {
      throw new InvalidBodyException('Email already in use');
    }
  }
}
