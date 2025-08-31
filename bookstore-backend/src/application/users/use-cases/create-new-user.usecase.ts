import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDTO } from '@presentation/auth/dtos/new-user.dto';
import { User } from '@domain/user.entity';
import * as bcrypt from 'bcryptjs';
import { Address } from '@domain/address.entity';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class CreateNewUser {
  constructor(
    private readonly usersService: UsersService,
    private readonly userValidator: UserValidator,
  ) {}

  async execute(dto: NewUserDTO): Promise<User> {
    await this.userValidator.validate(dto);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User({ ...dto, password: hashedPassword });

    user.addresses.push(new Address(dto.address));

    return this.usersService.save(user);
  }
}
