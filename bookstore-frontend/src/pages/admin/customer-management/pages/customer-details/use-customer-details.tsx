import { useEffect } from 'react'

import type { UserDTO } from '@/dtos/user/user'
import { useUser } from '@/hooks'
import { useToast } from '@/providers/toast/use-toast'

interface UseCustomerDetailsReturn {
  customer: UserDTO | null
  isLoading: boolean
  error: string | null
}

export const useCustomerDetails = (
  customerId: string,
): UseCustomerDetailsReturn => {
  const { user, isUserLoading, userError, getUserById, clearError } = useUser()
  const { addToast } = useToast()

  useEffect(() => {
    const loadCustomerDetails = async () => {
      if (!customerId) {
        addToast('ID do cliente não fornecido', 'error')
        return
      }

      try {
        clearError()
        const result = await getUserById(customerId)

        if (!result.success && result.error) {
          addToast(result.error, 'error')
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar dados do cliente'

        addToast(errorMessage, 'error')
      }
    }

    loadCustomerDetails()
  }, [customerId, getUserById, addToast, clearError])

  return {
    customer: user,
    isLoading: isUserLoading,
    error: userError,
  }
}
