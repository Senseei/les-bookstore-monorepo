import { Inject, Injectable } from '@nestjs/common';

import { BaseService } from '@/application/base.service';
import { UsersService } from '@/application/users/services';
import { Order } from '@/domain/order/order.entity';
import { OrderStatus } from '@/domain/order/status.enum';

import { OrdersRepository } from '../orders.repository';

@Injectable()
export class OrdersService extends BaseService<Order> {
  constructor(
    @Inject('OrdersRepository')
    private readonly repository: OrdersRepository,
    private readonly usersService: UsersService,
  ) {
    super(repository);
  }

  public async findByUserAndStatus(userId: string, status?: OrderStatus) {
    const user = await this.usersService.findActiveCustomerByIdOrThrow(userId);
    return await this.repository.findByUserAndStatus(user, status);
  }
}
