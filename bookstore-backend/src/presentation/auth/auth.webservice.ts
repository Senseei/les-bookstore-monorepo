import { CreateNewUser } from '@application/users/use-cases/create-new-user.usecase';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '@presentation/common/users/dtos';

import { AuthService } from '@/application/auth/auth.service';

import { AuthenticatedUserDTO } from './dtos/authenticated-user.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { JwtPayload, JwtToken } from './interfaces';

@Injectable()
export class AuthWebService {
  constructor(
    private createNewUser: CreateNewUser,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    userPassword: string,
  ): Promise<AuthenticatedUserDTO> {
    const user = await this.authService.validateUser(email, userPassword);

    return new AuthenticatedUserDTO(
      user.getId(),
      user.getName(),
      user.getEmail(),
      user.getRole(),
    );
  }

  public signIn(user: AuthenticatedUserDTO): JwtToken {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async signUp(dto: NewUserDTO): Promise<UserDTO> {
    return new UserDTO(await this.createNewUser.execute(dto));
  }
}
