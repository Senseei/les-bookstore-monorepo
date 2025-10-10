import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';

import { OrderStatus } from '@/domain/order/status.enum';
import { AuthenticatedRequest } from '@/presentation/auth/interfaces';
import { OrderDTO } from '@/presentation/common/books/dtos/order.dto';

import { CreateNewOrderDTO } from './dtos/create-new-order.dto';
import { OrdersWebService } from './orders.webservice';

@Controller('orders')
export class OrdersController {
  constructor(private readonly webService: OrdersWebService) {}

  @Post()
  public async createOrder(
    @Body() dto: CreateNewOrderDTO,
    @Request() req: AuthenticatedRequest,
  ): Promise<OrderDTO> {
    const userId = req.user.userId;
    return await this.webService.createOrder(dto, userId);
  }

  @Get()
  public async getOrders(
    @Request() req: AuthenticatedRequest,
    @Query('status') status?: OrderStatus,
  ): Promise<OrderDTO[]> {
    const userId = req.user.userId;
    return this.webService.findByUserAndStatus(userId, status);
  }
}
