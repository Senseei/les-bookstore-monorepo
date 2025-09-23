import { AddressService, UsersService } from '@application/users/services';
import {
  AddUserAddress,
  ChangeUserPassword,
  RemoveUserAddress,
  UpdateUser,
  UpdateUserAddress,
} from '@application/users/use-cases';
import { Injectable } from '@nestjs/common';
import { PaginatedResultDTO } from '@presentation/dtos/paginated-result.dto';
import { PaginationParamsDTO } from '@presentation/dtos/pagination-params.dto';

import {
  AddressDTO,
  ChangePasswordDTO,
  CreateAddressDTO,
  MinUserDTO,
  UpdateAddressDTO,
  UpdateUserDTO,
  UserDTO,
} from './dtos';

@Injectable()
export class UsersWebService {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressService: AddressService,
    private readonly changeUserPassword: ChangeUserPassword,
    private readonly updateUser: UpdateUser,
    private readonly addUserAddress: AddUserAddress,
    private readonly updateUserAddress: UpdateUserAddress,
    private readonly removeUserAddress: RemoveUserAddress,
  ) {}

  public async findById(id: string): Promise<UserDTO> {
    const user = await this.usersService.findByIdOrThrow(id);
    return new UserDTO(user);
  }

  public async findAll(
    params: PaginationParamsDTO,
    filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<MinUserDTO>> {
    const result = await this.usersService.findAll(
      params.page,
      params.limit,
      filters,
      params.orderBy,
    );

    return new PaginatedResultDTO(
      result.items.map((item) => new MinUserDTO(item)),
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
    const addresses = await this.addressService.findByUserId(userId);
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
