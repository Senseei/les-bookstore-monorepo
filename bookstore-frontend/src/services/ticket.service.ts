import type { TicketDTO, ValidateTicketDTO } from '@/dtos'

import { AxiosApp } from './axios-app'

/**
 * Ticket API Service
 * Handles all ticket-related API calls
 */
export class TicketService {
  /**
   * Validate a ticket code with current order value
   * @param ticketCode - The ticket code to validate
   * @param orderValue - The current order total value
   */
  static async validateTicket(
    ticketCode: string,
    orderValue: number,
  ): Promise<TicketDTO> {
    const payload = {
      code: ticketCode,
      orderValue,
    } as ValidateTicketDTO

    const response = await AxiosApp.post<TicketDTO>(
      '/tickets/validate',
      payload,
    )

    return response.data
  }
}
