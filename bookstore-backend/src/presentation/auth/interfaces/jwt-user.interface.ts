import { UserRole } from '@/domain/user/enums/role.enum';

export interface JwtUser {
  userId: string;
  email: string;
  role: UserRole;
}
