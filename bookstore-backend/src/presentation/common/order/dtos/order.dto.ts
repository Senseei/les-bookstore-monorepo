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
  totalRefunded: number;
  canBeRefunded: boolean;

  constructor(order: Order) {
    this.id = order.id;

    const refundedQuantities = order.getRefundedQuantitiesByItem();
    this.items = order.items.map(
      (item) =>
        new OrderItemDTO(item, refundedQuantities.get(item.bookId) || 0),
    );

    this.totalItems = order.getTotalItems();
    this.subtotal = order.getSubtotal();
    this.discount = order.getDiscount();
    this.orderDate = order.orderDate;
    this.status = order.status;
    this.tickets = (order.tickets || []).map(
      (ticket) => new TicketResponseDto(ticket),
    );
    this.totalRefunded = order.getTotalRefunded();
    this.canBeRefunded = order.canBeRefunded();
  }
}
