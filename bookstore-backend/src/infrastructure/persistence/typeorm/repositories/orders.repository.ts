import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrdersRepository } from '@/application/orders/orders.repository';
import { Order } from '@/domain/order/order.entity';

import { CRUDRepository } from './base.repository';

@Injectable()
export class OrdersRepositoryImpl
  extends CRUDRepository<Order>
  implements OrdersRepository
{
  constructor(@InjectRepository(Order) repository: Repository<Order>) {
    super(repository);
  }
}
