import { UsersService } from '@application/users/services';
import { CreateNewUser } from '@application/users/use-cases/create-new-user.usecase';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '@presentation/common/users/dtos';
import * as bcrypt from 'bcryptjs';

import { AuthenticatedUserDTO } from './dtos/authenticated-user.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { InactiveUserException } from './exceptions/inactive-user.exception';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtToken } from './interfaces/jwt-token.interface';

@Injectable()
export class AuthWebService {
  constructor(
    private usersService: UsersService,
    private createNewUser: CreateNewUser,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    userPassword: string,
  ): Promise<AuthenticatedUserDTO> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(userPassword, user.password))) {
      throw new InvalidCredentialsException('Invalid email or password');
    }

    if (!user.active) {
      throw new InactiveUserException('User is inactive');
    }

    return new AuthenticatedUserDTO(user.id, user.name, user.email);
  }

  public signIn(user: AuthenticatedUserDTO): JwtToken {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async signUp(dto: NewUserDTO): Promise<UserDTO> {
    return new UserDTO(await this.createNewUser.execute(dto));
  }
}
