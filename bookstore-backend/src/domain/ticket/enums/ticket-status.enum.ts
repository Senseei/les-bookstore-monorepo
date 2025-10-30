/**
 * Status do cupom
 * 
 * ACTIVE: Cupom válido e disponível para uso
 * USED: Cupom já foi utilizado (uso único)
 * EXPIRED: Cupom passou da data de validade
 * 
 * Nota: Cupons de troca têm uso ÚNICO. Se sobrar valor,
 * um NOVO cupom é gerado (RN0036).
 */
export enum TicketStatus {
  ACTIVE = 'active',
  USED = 'used',
  EXPIRED = 'expired',
}
