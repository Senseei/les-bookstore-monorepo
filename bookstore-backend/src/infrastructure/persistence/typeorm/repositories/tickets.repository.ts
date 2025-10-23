import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TicketsRepository } from '@/application/orders/interfaces/tickets.repository';
import { Ticket } from '@/domain/ticket/ticket.entity';

import { CRUDRepository } from './base.repository';

@Injectable()
export class TicketsRepositoryImpl
  extends CRUDRepository<Ticket>
  implements TicketsRepository
{
  constructor(@InjectRepository(Ticket) repository: Repository<Ticket>) {
    super(repository);
  }

  findByCode(code: string): Promise<Ticket | null> {
    return this.repository.findOne({ where: { code } });
  }
}
