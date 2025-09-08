import { ChangeUserPassword } from '@application/users/use-cases/change-user-password.usecase';
import { UsersService } from '@application/users/use-cases/users.service';
import { Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { PaginatedResultDTO } from '@presentation/dtos/paginated-result.dto';
import { UserDTO } from './dtos/user.dto';
import { PaginationParamsDTO } from '@presentation/dtos/pagination-params.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UpdateUser } from '@application/users/use-cases/update-user.usecase';
import { AddUserAddress } from '@application/users/use-cases/add-user-address.usecase';
import { UpdateUserAddress } from '@application/users/use-cases/update-user-address.usecase';
import { RemoveUserAddress } from '@application/users/use-cases/remove-user-address.usecase';
import { GetUserAddresses } from '@application/users/use-cases/get-user-addresses.usecase';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';
import { AddressDTO } from './dtos/address.dto';

@Injectable()
export class UsersWebService {
  constructor(
    private readonly usersService: UsersService,
    private readonly changeUserPassword: ChangeUserPassword,
    private readonly updateUser: UpdateUser,
    private readonly addUserAddress: AddUserAddress,
    private readonly updateUserAddress: UpdateUserAddress,
    private readonly removeUserAddress: RemoveUserAddress,
    private readonly getUserAddresses: GetUserAddresses,
  ) {}

  public async findById(id: string): Promise<UserDTO> {
    const user = await this.usersService.findByIdOrThrow(id);
    return new UserDTO(user);
  }

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

  // Métodos para gerenciamento de endereços
  public async getAddressesByUserId(userId: string): Promise<AddressDTO[]> {
    const addresses = await this.getUserAddresses.execute(userId);
    return addresses.map((address) => new AddressDTO(address));
  }

  public async createUserAddress(
    userId: string,
    dto: CreateAddressDTO,
  ): Promise<AddressDTO> {
    const address = await this.addUserAddress.execute(userId, dto);
    return new AddressDTO(address);
  }

  public async updateAddress(
    userId: string,
    addressId: string,
    dto: UpdateAddressDTO,
  ): Promise<AddressDTO> {
    const address = await this.updateUserAddress.execute(
      userId,
      addressId,
      dto,
    );
    return new AddressDTO(address);
  }

  public async deleteUserAddress(
    userId: string,
    addressId: string,
  ): Promise<void> {
    await this.removeUserAddress.execute(userId, addressId);
  }
}
