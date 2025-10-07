import { Order } from '@/domain/order/order.entity';

import { OrderItemDTO } from './order-item.dto';

export class OrderDTO {
  items: OrderItemDTO[];
  totalItems: number;
  totalPrice: number;
  orderDate: Date;

  constructor(order: Order) {
    this.items = order.items.map((item) => new OrderItemDTO(item));
    this.totalItems = order.getTotalItems();
    this.totalPrice = order.getTotalPrice();
    this.orderDate = order.orderDate;
  }
}
