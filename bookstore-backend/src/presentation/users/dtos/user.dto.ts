import { User } from '@domain/user.entity';
import { Gender } from '@domain/enums/gender.enum';
import { AddressDTO } from './address.dto';

export class UserDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  addresses: AddressDTO[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.cpf = user.cpf;
    this.phone = user.phone;
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.addresses = user.addresses.map((address) => new AddressDTO(address));
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.active = user.active;
  }
}
