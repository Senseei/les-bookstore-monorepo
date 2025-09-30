import { UserRole } from '@/domain/user/enums/role.enum';

export interface UserAuthDetails {
  getId(): string;
  getEmail(): string;
  getName(): string;
  getRole(): UserRole;
}
