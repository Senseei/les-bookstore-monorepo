import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users.service';
import { InvalidCredentialsException } from '@presentation/auth/exceptions/invalid-credentials.exception';

@Injectable()
export class ChangeUserPassword {
  constructor(private readonly usersService: UsersService) {}

  public async execute(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersService.findActiveUserById(userId);

    if (!(await bcrypt.compare(oldPassword, user.password)))
      throw new InvalidCredentialsException('Old password is incorrect');

    user.password = await bcrypt.hash(newPassword, 10);

    await this.usersService.save(user);
  }
}
