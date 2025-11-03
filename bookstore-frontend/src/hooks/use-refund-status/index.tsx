import { useState } from 'react'

import type { RefundStatusType } from '@/dtos'
import { useToast } from '@/providers'
import { OrderService, UserService } from '@/services'

export const useRefundStatus = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { showSuccess, showError } = useToast()

  const changeRefundStatus = async (
    orderId: string,
    refundId: string,
    newStatus: RefundStatusType,
  ) => {
    setIsLoading(true)
    try {
      await OrderService.changeRefundStatus(orderId, refundId, {
        status: newStatus,
      })

      showSuccess('O status do reembolso foi atualizado com sucesso.')
    } catch (error) {
      showError(
        'Não foi possível atualizar o status do reembolso. Tente novamente.',
      )

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const changeUserRefundStatus = async (
    userId: string,
    orderId: string,
    refundId: string,
    newStatus: RefundStatusType,
  ) => {
    setIsLoading(true)
    try {
      await UserService.changeUserOrderRefundStatus(userId, orderId, refundId, {
        status: newStatus,
      })

      showSuccess('O status do reembolso foi atualizado com sucesso.')
    } catch (error) {
      showError(
        'Não foi possível atualizar o status do reembolso. Tente novamente.',
      )

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    changeRefundStatus,
    changeUserRefundStatus,
    isLoading,
  }
}
