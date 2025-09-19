import { JwtUser } from '@infrastructure/jwt/jwt.strategy';
import { Request } from '@nestjs/common';

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}
