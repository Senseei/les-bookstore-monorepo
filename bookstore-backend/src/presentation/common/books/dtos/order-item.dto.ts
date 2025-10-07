import { OrderItem } from '@/domain/order/order-item.entity';

import { MinBookDTO } from './min-book.dto';

export class OrderItemDTO {
  book: MinBookDTO;
  quantity: number;
  unitPrice: number;
  totalPrice: number;

  constructor(entity: OrderItem) {
    this.book = new MinBookDTO(entity.book);
    this.quantity = entity.quantity;
    this.unitPrice = entity.unitPrice;
    this.totalPrice = entity.getTotalPrice();
  }
}
