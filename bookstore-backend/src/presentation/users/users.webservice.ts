import { ChangeUserPassword } from '@application/users/use-cases/change-user-password.usecase';
import { UsersService } from '@application/users/use-cases/users.service';
import { Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { PaginatedResultDTO } from '@presentation/dtos/paginated-result.dto';
import { UserDTO } from './dtos/user.dto';
import { PaginationParamsDTO } from '@presentation/dtos/pagination-params.dto';

@Injectable()
export class UsersWebService {
  constructor(
    private readonly usersService: UsersService,
    private readonly changeUserPassword: ChangeUserPassword,
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

  public async resetPassword(id: string, dto: ChangePasswordDTO) {
    await this.changeUserPassword.execute(id, dto.oldPassword, dto.newPassword);
  }
}
