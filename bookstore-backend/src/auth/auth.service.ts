import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtToken } from './interfaces/jwt-token.interface';
import { AuthenticatedUserDTO } from './dtos/authenticated-user.dto';
import { UsersService } from '@users/users.service';
import { NewUserDTO } from './dtos/new-user.dto';
import { User } from '@users/entities/user.entity';
import { UserDTO } from '@users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
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

    return new AuthenticatedUserDTO(user.id, user.name, user.email);
  }

  public login(user: AuthenticatedUserDTO): JwtToken {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async signUp(dto: NewUserDTO): Promise<UserDTO> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User({
      name: dto.name,
      birthDate: dto.birthDate,
      cpf: dto.cpf,
      email: dto.email,
      gender: dto.gender,
      password: hashedPassword,
      phone: dto.phone,
    });

    return new UserDTO(await this.usersService.save(user));
  }
}
