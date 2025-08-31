import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthWebService } from './auth.service';
import { JwtToken } from './interfaces/jwt-token.interface';
import { LoginCredentialsDTO } from './dtos/login-credentials.dto';
import { UserDTO } from '@presentation/users/dtos/user.dto';
import { NewUserDTO } from './dtos/new-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthWebService) {}

  @Post('login')
  public async login(@Body() body: LoginCredentialsDTO): Promise<JwtToken> {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('signup')
  @HttpCode(201)
  public async signUp(@Body() body: NewUserDTO): Promise<UserDTO> {
    return await this.authService.signUp(body);
  }
}
