import { BaseRepository } from '@/application/base.repository';
import { Ticket } from '@/domain/ticket/ticket.entity';

export interface TicketsRepository extends BaseRepository<Ticket> {}
