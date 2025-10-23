import { Inject, Injectable, NotFoundException } from '@nestjs/common';

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

  public async findByCode(code: string): Promise<Ticket | null> {
    return this.repository.findByCode(code);
  }

  public async findByCodeOrThrow(code: string): Promise<Ticket> {
    const ticket = await this.findByCode(code);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }
}
