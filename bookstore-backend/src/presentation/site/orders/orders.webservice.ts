import { Injectable } from '@nestjs/common';

import { OrdersService } from '@/application/orders/services/orders.service';
import { CreateNewOrder } from '@/application/orders/use-cases/create-new-order.usecase';
import { PayOrder } from '@/application/orders/use-cases/pay-order.usecase';
import { OrderStatus } from '@/domain/order/status.enum';
import { OrderDTO } from '@/presentation/common/books/dtos/order.dto';

import { CreateNewOrderDTO } from './dtos/create-new-order.dto';
import { PaymentsDTO } from './dtos/payments.dto';

@Injectable()
export class OrdersWebService {
  constructor(
    private readonly service: OrdersService,
    private readonly createNewOrder: CreateNewOrder,
    private readonly payOrder: PayOrder,
  ) {}

  public async createOrder(
    dto: CreateNewOrderDTO,
    userId: string,
  ): Promise<OrderDTO> {
    return new OrderDTO(await this.createNewOrder.execute(dto, userId));
  }

  public async findByUserAndStatus(
    userId: string,
    status?: OrderStatus,
  ): Promise<OrderDTO[]> {
    const result = await this.service.findByUserAndStatus(userId, status);
    return result.map((order) => new OrderDTO(order));
  }

  public async pay(orderId: string, dto: PaymentsDTO): Promise<OrderDTO> {
    return new OrderDTO(await this.payOrder.execute(orderId, dto));
  }
}
