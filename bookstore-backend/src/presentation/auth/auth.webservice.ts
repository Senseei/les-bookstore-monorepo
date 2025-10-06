import { CreateNewUser } from '@application/users/use-cases/create-new-user.usecase';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '@presentation/common/users/dtos';

import { AuthService } from '@/application/auth/auth.service';

import { AuthenticatedUserDTO } from './dtos/authenticated-user.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { JwtPayload, JwtToken } from './interfaces';

@Injectable()
export class AuthWebService {
  constructor(
    private createNewUser: CreateNewUser,
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
    return this.generateAccessTokens(payload);
  }

  public async signUp(dto: NewUserDTO): Promise<UserDTO> {
    return new UserDTO(await this.createNewUser.execute(dto));
  }

  public refreshToken(dto: RefreshTokenDTO): JwtToken {
    try {
      const payload: JwtPayload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      return this.generateAccessTokens(payload);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private generateAccessTokens(payload: JwtPayload): JwtToken {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    };
  }
}
