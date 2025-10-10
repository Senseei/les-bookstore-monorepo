import { Injectable } from '@nestjs/common';

import { UsersService } from '@/application/users/services';
import { Order } from '@/domain/order/order.entity';
import { CreateNewOrderDTO } from '@/presentation/site/orders/dtos/create-new-order.dto';

import { OrdersService } from '../services/orders.service';

@Injectable()
export class CreateNewOrder {
  constructor(
    private readonly service: OrdersService,
    private readonly usersService: UsersService,
  ) {}

  public async execute(dto: CreateNewOrderDTO, userId: string): Promise<Order> {
    const user = await this.usersService.findActiveByIdOrThrow(userId);

    const order = new Order(user.customerDetails);
    return await this.service.save(order);
  }
}
