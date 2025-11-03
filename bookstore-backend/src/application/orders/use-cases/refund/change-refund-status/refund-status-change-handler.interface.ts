import { RefundStatus } from '@/domain/order/enums/refund-status.enum';
import { Refund } from '@/domain/order/refund.entity';

export interface RefundStatusChangeHandler {
  handle(refund: Refund, userId: string): Promise<Refund>;
  getStatus(): RefundStatus;
}
