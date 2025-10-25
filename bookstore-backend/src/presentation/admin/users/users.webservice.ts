import { UsersService } from '@application/users/services';
import { Injectable } from '@nestjs/common';

import { OrdersService } from '@/application/orders/services/orders.service';
import { UserRole } from '@/domain/user/enums/role.enum';
import { OrderDTO } from '@/presentation/common/books/dtos/order.dto';
import { PaginatedResultDTO } from '@/presentation/dtos/paginated-result.dto';
import { PaginationParamsDTO } from '@/presentation/dtos/pagination-params.dto';

import { MinUserDTO } from './dtos';
import { CustomerDTO } from './dtos/customer.dto';

@Injectable()
export class UsersWebService {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

  public async findById(id: string): Promise<CustomerDTO> {
    const user = await this.usersService.findByIdOrThrow(id);
    return new CustomerDTO(user);
  }

  public async findAll(
    params: PaginationParamsDTO,
    filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<MinUserDTO>> {
    // Add filter to exclude admin users from customer list
    const customersOnlyFilters = {
      ...filters,
      role: UserRole.USER,
    };

    const result = await this.usersService.findAll(
      params.page,
      params.limit,
      customersOnlyFilters,
      params.orderBy,
    );

    return new PaginatedResultDTO(
      result.items.map((item) => new MinUserDTO(item)),
      result.count,
      params.limit,
      params.page,
    );
  }

  public async getUserOrders(
    userId: string,
    params: PaginationParamsDTO,
    filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<OrderDTO>> {
    const result = await this.ordersService.findByUser(
      userId,
      params.page,
      params.limit,
      filters,
      params.orderBy,
    );

    return new PaginatedResultDTO(
      result.items.map((item) => new OrderDTO(item)),
      result.count,
      params.limit,
      params.page,
    );
  }

  public async inactivate(id: string): Promise<void> {
    await this.usersService.inactivate(id);
  }
}
