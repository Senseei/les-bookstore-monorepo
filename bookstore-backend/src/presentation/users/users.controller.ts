import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UsersWebService } from './users.webservice';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { PaginationParamsDTO } from '@presentation/dtos/pagination-params.dto';
import { PaginatedResultDTO } from '@presentation/dtos/paginated-result.dto';
import { UserDTO } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersWebService: UsersWebService) {}

  @Get()
  public async findAll(
    @Query() query: PaginationParamsDTO,
  ): Promise<PaginatedResultDTO<UserDTO>> {
    return this.usersWebService.findAll(query);
  }

  @Put(':id/password')
  public async changePassword(
    @Param('id') id: string,
    @Body() body: ChangePasswordDTO,
  ): Promise<void> {
    await this.usersWebService.resetPassword(id, body);
  }
}
