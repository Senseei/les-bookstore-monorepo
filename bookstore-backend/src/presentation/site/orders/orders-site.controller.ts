import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserRole } from '@/domain/user/enums/role.enum';
import { Roles } from '@/infrastructure/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from '@/infrastructure/auth/guards';
import { AuthenticatedRequest } from '@/presentation/auth/interfaces';
import { OrderDTO } from '@/presentation/common/books/dtos/order.dto';
import { PaginatedResultDTO } from '@/presentation/dtos/paginated-result.dto';
import { PaginationParamsDTO } from '@/presentation/dtos/pagination-params.dto';

import { ChangeOrderStatusDTO } from './dtos/change-order-status.dto';
import { CreateNewOrderDTO } from './dtos/create-new-order.dto';
import { PaymentsDTO } from './dtos/payments.dto';
import { OrdersSiteWebService } from './orders-site.webservice';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
@Controller('orders')
export class OrdersSiteController {
  constructor(private readonly webService: OrdersSiteWebService) {}

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
    @Query() query: PaginationParamsDTO,
    @Query() filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<OrderDTO>> {
    const userId = req.user.userId;
    return this.webService.findByUser(userId, query, filters);
  }

  @Post(':id/pay')
  public async payOrder(
    @Param('id') orderId: string,
    @Body() dto: PaymentsDTO,
  ): Promise<OrderDTO> {
    return await this.webService.pay(orderId, dto);
  }

  @Patch(':id')
  public async changeOrderStatus(
    @Param('id') orderId: string,
    @Body() dto: ChangeOrderStatusDTO,
    @Request() req: AuthenticatedRequest,
  ): Promise<OrderDTO> {
    const userId = req.user.userId;
    return this.webService.changeStatus(orderId, userId, dto.status);
  }
}
