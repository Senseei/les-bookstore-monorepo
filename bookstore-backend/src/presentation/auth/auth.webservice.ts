import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtToken } from './interfaces/jwt-token.interface';
import { AuthenticatedUserDTO } from './dtos/authenticated-user.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { UserDTO } from '@presentation/users/dtos/user.dto';
import { CreateNewUser } from '@application/users/use-cases/create-new-user.usecase';
import { UsersService } from '@application/users/use-cases/users.service';
import { InactiveUserException } from './exceptions/inactive-user.exception';

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

  public login(user: AuthenticatedUserDTO): JwtToken {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async signUp(dto: NewUserDTO): Promise<UserDTO> {
    return new UserDTO(await this.createNewUser.execute(dto));
  }
}
