import { Injectable } from '@nestjs/common';

import { ChangeOrderStatus } from '@/application/orders/use-cases/change-order-status/change-order-status.usecase';
import { CreateNewOrder } from '@/application/orders/use-cases/create-new-order.usecase';
import { PayOrder } from '@/application/orders/use-cases/pay-order.usecase';
import { RefundOrderItems } from '@/application/orders/use-cases/refund/refund-order-items.usecase';
import { UsersService } from '@/application/users/services';
import { OrderStatus } from '@/domain/order/enums/status.enum';
import { OrderDTO } from '@/presentation/common/order/dtos/order.dto';

import { CreateNewOrderDTO } from './dtos/create-new-order.dto';
import { PaymentsDTO } from './dtos/payments.dto';
import { RefundRequestDTO } from './dtos/refund-request.dto';

@Injectable()
export class OrdersSiteWebService {
  constructor(
    private readonly usersService: UsersService,
    private readonly createNewOrder: CreateNewOrder,
    private readonly payOrder: PayOrder,
    private readonly changeOrderStatus: ChangeOrderStatus,
    private readonly refundOrderItems: RefundOrderItems,
  ) {}

  public async createOrder(
    dto: CreateNewOrderDTO,
    userId: string,
  ): Promise<OrderDTO> {
    return new OrderDTO(await this.createNewOrder.execute(dto, userId));
  }

  public async pay(orderId: string, dto: PaymentsDTO): Promise<OrderDTO> {
    return new OrderDTO(await this.payOrder.execute(orderId, dto));
  }

  public async changeStatus(
    orderId: string,
    userId: string,
    status: OrderStatus,
  ): Promise<OrderDTO> {
    const loggedUser = await this.usersService.findByIdOrThrow(userId);

    return new OrderDTO(
      await this.changeOrderStatus.execute(
        orderId,
        status,
        loggedUser.isAdmin() ? undefined : userId,
      ),
    );
  }

  public async refundItems(
    id: string,
    dto: RefundRequestDTO,
    userId: string,
  ): Promise<OrderDTO> {
    return new OrderDTO(await this.refundOrderItems.execute(id, dto, userId));
  }
}
