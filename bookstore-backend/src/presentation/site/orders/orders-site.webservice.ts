import { Injectable } from '@nestjs/common';

import { OrdersService } from '@/application/orders/services/orders.service';
import { ChangeOrderStatus } from '@/application/orders/use-cases/change-order-status/change-order-status.usecase';
import { CreateNewOrder } from '@/application/orders/use-cases/create-new-order.usecase';
import { PayOrder } from '@/application/orders/use-cases/pay-order.usecase';
import { OrderStatus } from '@/domain/order/status.enum';
import { OrderDTO } from '@/presentation/common/books/dtos/order.dto';
import { PaginatedResultDTO } from '@/presentation/dtos/paginated-result.dto';
import { PaginationParamsDTO } from '@/presentation/dtos/pagination-params.dto';

import { CreateNewOrderDTO } from './dtos/create-new-order.dto';
import { PaymentsDTO } from './dtos/payments.dto';

@Injectable()
export class OrdersSiteWebService {
  constructor(
    private readonly service: OrdersService,
    private readonly createNewOrder: CreateNewOrder,
    private readonly payOrder: PayOrder,
    private readonly changeOrderStatus: ChangeOrderStatus,
  ) {}

  public async createOrder(
    dto: CreateNewOrderDTO,
    userId: string,
  ): Promise<OrderDTO> {
    return new OrderDTO(await this.createNewOrder.execute(dto, userId));
  }

  public async findByUser(
    userId: string,
    params: PaginationParamsDTO,
    filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<OrderDTO>> {
    const result = await this.service.findByUser(
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

  public async pay(orderId: string, dto: PaymentsDTO): Promise<OrderDTO> {
    return new OrderDTO(await this.payOrder.execute(orderId, dto));
  }

  public async changeStatus(
    orderId: string,
    userId: string,
    status: OrderStatus,
  ): Promise<OrderDTO> {
    return new OrderDTO(
      await this.changeOrderStatus.execute(orderId, userId, status),
    );
  }
}
