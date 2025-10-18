import { Inject, Injectable } from '@nestjs/common';

import { BaseService } from '@/application/base.service';
import { Ticket } from '@/domain/ticket/ticket.entity';

import { TicketsRepository } from '../interfaces/tickets.repository';

@Injectable()
export class TicketsService extends BaseService<Ticket> {
  constructor(
    @Inject('TicketsRepository')
    private readonly repository: TicketsRepository,
  ) {
    super(repository);
  }
}
