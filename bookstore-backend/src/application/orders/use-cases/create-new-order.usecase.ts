import { Injectable } from '@nestjs/common';

import { BooksService } from '@/application/books/services/books.service';
import { UsersService } from '@/application/users/services';
import { Order } from '@/domain/order/order.entity';
import { OrderItem } from '@/domain/order/order-item.entity';
import { CreateNewOrderDTO } from '@/presentation/site/orders/dtos/create-new-order.dto';

import { OrdersService } from '../services/orders.service';

@Injectable()
export class CreateNewOrder {
  constructor(
    private readonly service: OrdersService,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  public async execute(dto: CreateNewOrderDTO, userId: string): Promise<Order> {
    const user = await this.usersService.findActiveByIdOrThrow(userId);

    const order = new Order(user.customerDetails);

    for (const item of dto.items) {
      const book = await this.booksService.findByIdOrThrow(item.bookId);
      order.addItem(new OrderItem({ book, quantity: item.quantity }));
    }

    return await this.service.save(order);
  }
}
