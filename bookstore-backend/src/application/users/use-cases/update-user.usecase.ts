import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from '@presentation/users/dtos/update-user.dto';
import { User } from '@domain/user.entity';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class UpdateUser {
  constructor(
    private readonly usersService: UsersService,
    private readonly userValidator: UserValidator,
  ) {}

  public async execute(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.usersService.findActiveUserById(id);

    await this.userValidator.validate(dto, id);

    user.update(dto);
    return await this.usersService.save(user);
  }
}
