import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtToken } from './interfaces/jwt-token.interface';
import { LoginCredentialsDTO } from './dtos/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginCredentialsDTO): Promise<JwtToken> {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
