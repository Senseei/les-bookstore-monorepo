import type { OrderBookDTO } from './order-book.dto'

export interface OrderItemDTO {
  book: OrderBookDTO
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderDTO {
  items: OrderItemDTO[]
  totalItems: number
  totalPrice: number
  orderDate: Date
}
