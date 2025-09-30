import { UserRole } from '@/domain/user/enums/role.enum';

export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: UserRole;
}
