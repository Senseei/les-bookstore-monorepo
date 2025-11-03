export const RefundStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PROCESSED: 'processed',
} as const

export type RefundStatusType = (typeof RefundStatus)[keyof typeof RefundStatus]

export interface RefundItemSummaryDTO {
  bookId: string
  bookTitle: string
  quantity: number
  unitPrice: number
  totalAmount: number
}

export interface RefundDTO {
  id: string
  status: RefundStatusType
  requestDate: Date
  processedAt?: Date
  totalAmount: number
  reason?: string
  items: RefundItemSummaryDTO[]
}

export interface RefundsSummaryDTO {
  totalRefunded: number
  refundsCount: number
  pendingRefunds: RefundDTO[]
  completedRefunds: RefundDTO[]
  rejectedRefunds: RefundDTO[]
  hasPendingRefunds: boolean
}
