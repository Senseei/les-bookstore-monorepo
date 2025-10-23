import { Injectable } from '@nestjs/common';

import { TicketsService } from '@/application/orders/services/tickets.service';
import { ValidateTicket } from '@/application/orders/use-cases/tickets/validate-ticket.usecase';

import { TicketDTO } from './dtos/ticket.dto';
import { ValidateTicketDTO } from './dtos/validate-ticket.dto';

@Injectable()
export class TicketsSiteWebService {
  constructor(
    private readonly service: TicketsService,
    private readonly validateTicketUseCase: ValidateTicket,
  ) {}

  public async validateTicket(
    dto: ValidateTicketDTO,
    userId: string,
  ): Promise<TicketDTO> {
    const ticket = await this.validateTicketUseCase.execute(dto.code, userId);
    return new TicketDTO({ entity: ticket, orderValue: dto.orderValue });
  }
}
