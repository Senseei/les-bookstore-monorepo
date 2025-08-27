import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtToken } from './interfaces/jwt-token.interface';
import { AuthenticatedUserDTO } from './dtos/authenticated-user.dto';
import { UsersRepository } from '@users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    userPassword: string,
  ): Promise<AuthenticatedUserDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(userPassword, user.password))) {
      throw new InvalidCredentialsException('Invalid email or password');
    }

    const { password, ...result } = user;
    return new AuthenticatedUserDTO(result.id, result.name, result.email);
  }

  public login(user: AuthenticatedUserDTO): JwtToken {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
