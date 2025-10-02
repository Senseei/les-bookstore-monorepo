import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { InvalidCredentialsException } from '@/application/auth/exceptions/invalid-credentials.exception';
import { UsersService } from '@/application/users/services';
import { UserAuthDetails } from '@/domain/user/interfaces/user-auth-details.interface';

import { InactiveUserException } from './exceptions/inactive-user.exception';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async validateUser(
    email: string,
    userPassword: string,
  ): Promise<UserAuthDetails> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(userPassword, user.password))) {
      throw new InvalidCredentialsException('Invalid email or password');
    }

    if (!user.active) {
      throw new InactiveUserException('User is inactive');
    }

    return user;
  }
}
