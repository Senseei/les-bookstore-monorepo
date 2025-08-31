import { ChangeUserPassword } from '@application/users/use-cases/change-user-password.usecase';
import { UsersService } from '@application/users/use-cases/users.service';
import { Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { PaginatedResultDTO } from '@presentation/dtos/paginated-result.dto';
import { UserDTO } from './dtos/user.dto';
import { PaginationParamsDTO } from '@presentation/dtos/pagination-params.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UpdateUser } from '@application/users/use-cases/update-user.usecase';

@Injectable()
export class UsersWebService {
  constructor(
    private readonly usersService: UsersService,
    private readonly changeUserPassword: ChangeUserPassword,
    private readonly updateUser: UpdateUser,
  ) {}

  public async findAll(
    params: PaginationParamsDTO,
    filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<UserDTO>> {
    const result = await this.usersService.findAll(
      params.page,
      params.limit,
      filters,
      params.orderBy,
    );

    return new PaginatedResultDTO(
      result.items.map((item) => new UserDTO(item)),
      result.count,
      params.limit,
      params.page,
    );
  }

  public async resetPassword(
    id: string,
    dto: ChangePasswordDTO,
  ): Promise<void> {
    await this.changeUserPassword.execute(id, dto.oldPassword, dto.newPassword);
  }

  public async update(id: string, dto: UpdateUserDTO): Promise<UserDTO> {
    return new UserDTO(await this.updateUser.execute(id, dto));
  }

  public async inactivate(id: string): Promise<void> {
    await this.usersService.inactivate(id);
  }
}
