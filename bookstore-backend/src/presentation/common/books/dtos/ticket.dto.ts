import { TicketType } from '@/domain/ticket/enums/ticket-type.enum';
import { Ticket } from '@/domain/ticket/ticket.entity';

export class TicketDTO {
  id: string;
  code: string;
  value: number;
  type: TicketType;
  validUntil: Date;

  constructor(ticket: Ticket) {
    this.id = ticket.id;
    this.code = ticket.code;
    this.value = ticket.value;
    this.type = ticket.type;
    this.validUntil = ticket.validUntil;
  }
}
