import { Request } from '@nestjs/common';

import { JwtUser } from './jwt-user.interface';

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}
