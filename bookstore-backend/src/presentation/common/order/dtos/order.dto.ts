import { OrderStatus } from '@/domain/order/enums/status.enum';
import { Order } from '@/domain/order/order.entity';
import { TicketResponseDto } from '@/presentation/dtos/ticket.dto';

import { OrderItemDTO } from './order-item.dto';

export class OrderDTO {
  id: string;
  items: OrderItemDTO[];
  totalItems: number;
  subtotal: number;
  discount: number;
  orderDate: Date;
  status: OrderStatus;
  tickets: TicketResponseDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.items = order.items.map((item) => new OrderItemDTO(item));
    this.totalItems = order.getTotalItems();
    this.subtotal = order.getSubtotal();
    this.discount = order.getDiscount();
    this.orderDate = order.orderDate;
    this.status = order.status;
    this.tickets = (order.tickets || []).map(
      (ticket) => new TicketResponseDto(ticket),
    );
  }
}
