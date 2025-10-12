import type { OrderDTO } from '@/dtos'

import { AxiosApp } from './axios-app'

/**
 * Order API Service
 * Handles all order-related API calls
 */
export class OrderService {
  /**
   * Cancel an order
   * @param orderId - The ID of the order to cancel
   */
  static async cancelOrder(orderId: string): Promise<OrderDTO> {
    const response = await AxiosApp.patch<OrderDTO>(`/orders/${orderId}/cancel`)
    return response.data
  }
}
