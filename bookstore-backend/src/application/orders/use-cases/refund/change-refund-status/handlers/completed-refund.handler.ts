import { Injectable } from '@nestjs/common';

import { RefundStatus } from '@/domain/order/enums/refund-status.enum';
import { Refund } from '@/domain/order/refund.entity';

import { GenerateExchangeTicket } from '../../../generate-exchange-ticket.use-case';
import { RefundStatusChangeHandler } from '../refund-status-change-handler.interface';

@Injectable()
export class CompletedRefundHandler implements RefundStatusChangeHandler {
  constructor(
    private readonly generateExchangeTicket: GenerateExchangeTicket,
  ) {}

  public async handle(refund: Refund, userId: string): Promise<Refund> {
    await this.generateExchangeTicket.execute({
      userId,
      originOrderId: refund.order.id,
      amount: refund.getTotalAmount(),
      reason: 'product_return',
    });
    return refund;
  }

  public getStatus(): RefundStatus {
    return RefundStatus.COMPLETED;
  }
}
