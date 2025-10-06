export enum OrderStatus {
  PROCESSING = 'processing', // Em processamento
  APPROVED = 'approved', // Aprovado (pagamento confirmado)
  IN_TRANSIT = 'in_transit', // Em trânsito
  DELIVERED = 'delivered', // Entregue
  EXCHANGE_REQUESTED = 'exchange_requested', // Troca solicitada
  EXCHANGE_AUTHORIZED = 'exchange_authorized', // Troca autorizada
  CANCELLED = 'cancelled', // Cancelado
}