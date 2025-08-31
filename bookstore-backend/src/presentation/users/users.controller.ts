import { Body, Controller, Param, Put } from '@nestjs/common';
import { UsersWebService } from './users.webservice';
import { ChangePasswordDTO } from './dtos/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersWebService: UsersWebService) {}

  @Put(':id/password')
  public async changePassword(
    @Param('id') id: string,
    @Body() body: ChangePasswordDTO,
  ): Promise<void> {
    await this.usersWebService.resetPassword(id, body);
  }
}
