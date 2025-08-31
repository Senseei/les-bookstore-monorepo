import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDTO } from '@presentation/auth/dtos/new-user.dto';
import { User } from '@domain/user.entity';
import * as bcrypt from 'bcryptjs';
import { Address } from '@domain/address.entity';

@Injectable()
export class CreateNewUser {
  constructor(private readonly usersService: UsersService) {}

  async execute(dto: NewUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User({
      name: dto.name,
      birthDate: dto.birthDate,
      cpf: dto.cpf,
      email: dto.email,
      gender: dto.gender,
      password: hashedPassword,
      phone: dto.phone,
    });

    user.addresses.push(
      new Address({
        type: dto.address.type,
        addressName: dto.address.addressName,
        postalCode: dto.address.postalCode,
        street: dto.address.street,
        number: dto.address.number,
        complement: dto.address.complement,
        district: dto.address.district,
        city: dto.address.city,
        state: dto.address.state,
      }),
    );

    return this.usersService.save(user);
  }
}
