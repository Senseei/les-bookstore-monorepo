import { UserRole } from '@/domain/user/enums/role.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
