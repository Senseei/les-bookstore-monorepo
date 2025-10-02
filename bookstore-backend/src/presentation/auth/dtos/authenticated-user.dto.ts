import { UserRole } from '@/domain/user/enums/role.enum';

export class AuthenticatedUserDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: UserRole,
  ) {}
}
