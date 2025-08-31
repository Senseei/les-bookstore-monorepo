import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from '@presentation/users/dtos/update-user.dto';
import { User } from '@domain/user.entity';

@Injectable()
export class UpdateUser {
  constructor(private readonly usersService: UsersService) {}

  public async execute(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.usersService.findByIdOrThrow(id);
    user.update(dto);
    return await this.usersService.save(user);
  }
}
