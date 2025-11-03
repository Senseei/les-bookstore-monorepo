import { Injectable } from '@nestjs/common';

import { RefundStatus } from '@/domain/order/enums/refund-status.enum';
import { Refund } from '@/domain/order/refund.entity';

import { RefundStatusChangeHandler } from '../refund-status-change-handler.interface';

@Injectable()
export class CompletedRefundHandler implements RefundStatusChangeHandler {
  public getStatus(): RefundStatus {
    return RefundStatus.COMPLETED;
  }

  public async handle(refund: Refund, userId: string): Promise<Refund> {
    // TODO
    return refund;
  }
}
