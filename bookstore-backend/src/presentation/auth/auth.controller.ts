import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserDTO } from '@presentation/common/users/dtos';

import { AuthWebService } from './auth.webservice';
import { LoginCredentialsDTO } from './dtos/login-credentials.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { JwtToken } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthWebService) {}

  @Post('sign-in')
  public async signIn(@Body() body: LoginCredentialsDTO): Promise<JwtToken> {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  @HttpCode(201)
  public async signUp(@Body() body: NewUserDTO): Promise<UserDTO> {
    return await this.authService.signUp(body);
  }

  @Post('refresh-token')
  public refreshToken(@Body() body: RefreshTokenDTO): JwtToken {
    return this.authService.refreshToken(body);
  }
}
