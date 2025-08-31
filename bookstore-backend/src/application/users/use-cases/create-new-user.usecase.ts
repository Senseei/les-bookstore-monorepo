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
    const user = new User({ ...dto, password: hashedPassword });

    user.addresses.push(new Address(dto.address));

    return this.usersService.save(user);
  }
}
