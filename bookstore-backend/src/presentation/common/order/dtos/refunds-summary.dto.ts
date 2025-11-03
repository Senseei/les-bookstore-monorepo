import { RefundStatus } from '@/domain/order/enums/refund-status.enum';
import { Refund } from '@/domain/order/refund.entity';
import { RefundItem } from '@/domain/order/refund-item.entity';

export class RefundItemSummaryDTO {
  bookId: string;
  bookTitle: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;

  constructor(refundItem: RefundItem) {
    this.bookId = refundItem.orderItem.book.id;
    this.bookTitle = refundItem.orderItem.book.title;
    this.quantity = refundItem.quantity;
    this.unitPrice = refundItem.unitPrice;
    this.totalAmount = refundItem.getTotalPrice();
  }
}

export class RefundDTO {
  id: string;
  status: RefundStatus;
  requestDate: Date;
  processedAt?: Date;
  totalAmount: number;
  reason?: string;
  items: RefundItemSummaryDTO[];

  constructor(refund: Refund) {
    this.id = refund.id;
    this.status = refund.status;
    this.requestDate = refund.requestDate;
    this.processedAt = refund.processedAt;
    this.totalAmount = refund.getTotalAmount();
    this.reason = refund.reason;
    this.items = refund.items.map((item) => new RefundItemSummaryDTO(item));
  }
}

export class RefundsSummaryDTO {
  totalRefunded: number;
  refundsCount: number;
  pendingRefunds: RefundDTO[];
  completedRefunds: RefundDTO[];
  rejectedRefunds: RefundDTO[];
  hasPendingRefunds: boolean;

  constructor(refunds: Refund[]) {
    const refundDTOs = refunds.map((refund) => new RefundDTO(refund));

    this.refundsCount = refunds.length;
    this.totalRefunded = refunds
      .filter((refund) => refund.status === RefundStatus.COMPLETED)
      .reduce((sum, refund) => sum + refund.getTotalAmount(), 0);

    this.pendingRefunds = refundDTOs.filter(
      (refund) =>
        refund.status === RefundStatus.REQUESTED ||
        refund.status === RefundStatus.APPROVED,
    );

    this.completedRefunds = refundDTOs.filter(
      (refund) => refund.status === RefundStatus.COMPLETED,
    );

    this.rejectedRefunds = refundDTOs.filter(
      (refund) => refund.status === RefundStatus.REJECTED,
    );

    this.hasPendingRefunds = this.pendingRefunds.length > 0;
  }
}
