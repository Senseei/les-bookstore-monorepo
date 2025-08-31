import { ChangeUserPassword } from '@application/users/use-cases/change-user-password.usecase';
import { UsersService } from '@application/users/use-cases/users.service';
import { Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from './dtos/change-password.dto';

@Injectable()
export class UsersWebService {
  constructor(
    private readonly usersService: UsersService,
    private readonly changeUserPassword: ChangeUserPassword,
  ) {}

  public async resetPassword(id: string, dto: ChangePasswordDTO) {
    await this.changeUserPassword.execute(id, dto.oldPassword, dto.newPassword);
  }
}
