export interface TicketDTO {
  id: string
  code: string
  discountAmount: number
  finalOrderValue: number
  description?: string
}

export interface ValidateTicketDTO {
  code: string
  orderValue: number
}
