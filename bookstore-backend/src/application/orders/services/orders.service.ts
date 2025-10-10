import { Inject, Injectable } from '@nestjs/common';

import { BaseService } from '@/application/base.service';
import { Order } from '@/domain/order/order.entity';

import { OrdersRepository } from '../orders.repository';

@Injectable()
export class OrdersService extends BaseService<Order> {
  constructor(
    @Inject('OrdersRepository')
    private readonly repository: OrdersRepository,
  ) {
    super(repository);
  }
}
