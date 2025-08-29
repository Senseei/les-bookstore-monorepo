import { User } from '@users/entities/user.entity';
import { Gender } from '@users/enums/gender.enum';

export class UserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  gender: Gender;
  birthDate: Date;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.cpf = user.cpf;
    this.phone = user.phone;
    this.password = user.password;
    this.gender = user.gender;
    this.birthDate = user.birthDate;
  }
}
