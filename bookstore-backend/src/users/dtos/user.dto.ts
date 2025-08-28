import { User } from '@users/entities/user.entity';

export class UserDTO {
  name: string;
  email: string;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
  }
}
