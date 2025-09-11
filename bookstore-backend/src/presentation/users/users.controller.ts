import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  // UseGuards, // TODO: Descomentar quando reativar JWT
} from '@nestjs/common';
import { UsersWebService } from './users.webservice';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { PaginationParamsDTO } from '@presentation/dtos/pagination-params.dto';
import { PaginatedResultDTO } from '@presentation/dtos/paginated-result.dto';
import { UserDTO } from './dtos/user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
// import { JwtAuthGuard } from '@infrastructure/jwt/jwt-auth.guard'; // TODO: Descomentar quando reativar JWT
import { CreateAddressDTO } from './dtos/create-address.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';
import { AddressDTO } from './dtos/address.dto';
import { MinUserDTO } from './dtos/min-user.dto';

// TODO: Reativar JWT Auth quando implementar o login
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersWebService: UsersWebService) {}

  @Get()
  public async findAll(
    @Query() query: PaginationParamsDTO,
    @Query() filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<MinUserDTO>> {
    return this.usersWebService.findAll(query, filters);
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<UserDTO> {
    return await this.usersWebService.findById(id);
  }

  @Put(':id/password')
  public async changePassword(
    @Param('id') id: string,
    @Body() body: ChangePasswordDTO,
  ): Promise<void> {
    await this.usersWebService.resetPassword(id, body);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDTO,
  ): Promise<UserDTO> {
    return await this.usersWebService.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.usersWebService.inactivate(id);
  }

  // Endpoints para gerenciamento de endereços
  @Get(':id/addresses')
  public async getUserAddresses(
    @Param('id') id: string,
  ): Promise<AddressDTO[]> {
    return await this.usersWebService.getAddressesByUserId(id);
  }

  @Post(':id/addresses')
  public async createUserAddress(
    @Param('id') id: string,
    @Body() body: CreateAddressDTO,
  ): Promise<AddressDTO> {
    return await this.usersWebService.createUserAddress(id, body);
  }

  @Put(':id/addresses/:addressId')
  public async updateUserAddress(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
    @Body() body: UpdateAddressDTO,
  ): Promise<AddressDTO> {
    return await this.usersWebService.updateAddress(id, addressId, body);
  }

  @Delete(':id/addresses/:addressId')
  public async deleteUserAddress(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
  ): Promise<void> {
    await this.usersWebService.deleteUserAddress(id, addressId);
  }
}
