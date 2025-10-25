import { BadRequestException, Injectable } from '@nestjs/common';

import { BooksService } from '@/application/books/services/books.service';
import { UsersService } from '@/application/users/services';
import { Order } from '@/domain/order/order.entity';
import { OrderStatus } from '@/domain/order/status.enum';

import { OrderStatusChangeHandler } from '../order-status-change-handler.interface';

@Injectable()
export class CancelOrderHandler implements OrderStatusChangeHandler {
  constructor(
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  public async handle(order: Order, userId: string): Promise<Order> {
    if (!order.canBeCancelled()) {
      throw new BadRequestException(
        `Order with ID ${order.id} cannot be cancelled in its current status: ${order.status}`,
      );
    }

    for (const item of order.items) {
      item.book.increaseStock(item.quantity);
    }

    if (order.ticket) {
      await this.usersService.reinstateTicketForUser(userId, order.ticket);
    }

    await this.booksService.saveAll(order.items.map((item) => item.book));

    return order;
  }

  public getStatus(): OrderStatus {
    return OrderStatus.CANCELLED;
  }
}
