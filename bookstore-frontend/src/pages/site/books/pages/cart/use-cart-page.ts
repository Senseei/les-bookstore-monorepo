import { useCallback, useEffect, useState } from 'react'

import type { UserDTO } from '@/dtos/user'
import { useTicket, useUser } from '@/hooks'
import { useAuth, useCart, useToast } from '@/providers'

interface UseCartPageReturn {
  // Cart state
  items: ReturnType<typeof useCart>['items']
  summary: ReturnType<typeof useCart>['summary']
  appliedTicket: ReturnType<typeof useCart>['appliedTicket']
  isEmpty: boolean

  // User state
  currentUserWithAddresses: UserDTO | null
  isAuthenticated: boolean

  // Loading states
  isCheckingOut: boolean
  isValidatingTicket: boolean

  // Modal state
  showAddressModal: boolean

  // Cart operations
  updateQuantity: (bookId: string, quantity: number) => void
  removeItem: (bookId: string) => void

  // Ticket operations
  handleApplyTicket: (ticketCode: string) => Promise<void>

  // Checkout operations
  handleCheckout: () => Promise<void>
  handleAddressSelected: (deliveryAddressId: string) => Promise<void>

  // Modal operations
  setShowAddressModal: (show: boolean) => void
}

export const useCartPage = (): UseCartPageReturn => {
  const {
    items,
    summary,
    updateQuantity,
    removeItem,
    checkout,
    appliedTicket,
    applyTicket,
    removeTicket,
    isEmpty,
  } = useCart()

  const { showSuccess, showError } = useToast()
  const { isAuthenticated } = useAuth()
  const { getCurrentUser } = useUser()
  const { validateTicket, isValidating } = useTicket()

  // Local state
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [currentUserWithAddresses, setCurrentUserWithAddresses] =
    useState<UserDTO | null>(null)

  // Load current user with addresses using getCurrentUser from useUser hook
  useEffect(() => {
    const loadCurrentUser = async () => {
      if (isAuthenticated && !currentUserWithAddresses) {
        try {
          const result = await getCurrentUser()
          if (result.success && result.data) {
            setCurrentUserWithAddresses(result.data)
          }
        } catch {
          // Silent error handling for user experience
        }
      }
    }

    loadCurrentUser()
  }, [isAuthenticated, currentUserWithAddresses, getCurrentUser])

  // Checkout handler
  const handleCheckout = useCallback(async () => {
    if (!isAuthenticated) {
      showError('Você precisa estar logado para finalizar o pedido.')
      return
    }

    if (
      !currentUserWithAddresses?.addresses ||
      currentUserWithAddresses.addresses.length === 0
    ) {
      showError('Você precisa cadastrar um endereço de entrega.')
      return
    }

    setShowAddressModal(true)
  }, [isAuthenticated, currentUserWithAddresses, showError])

  // Address selection handler
  const handleAddressSelected = useCallback(
    async (deliveryAddressId: string) => {
      setShowAddressModal(false)
      setIsCheckingOut(true)

      try {
        const result = await checkout(deliveryAddressId)

        if (result.success) {
          showSuccess(
            `Pedido realizado com sucesso! Número do pedido: ${result.orderId}`,
          )
          // The cart will be automatically cleared by the checkout function
        } else {
          showError(
            result.error || 'Erro ao finalizar pedido. Tente novamente.',
          )
        }
      } catch {
        showError('Erro inesperado ao finalizar pedido. Tente novamente.')
      } finally {
        setIsCheckingOut(false)
      }
    },
    [checkout, showSuccess, showError, currentUserWithAddresses],
  )

  // Ticket application handler
  const handleApplyTicket = useCallback(
    async (ticketCode: string) => {
      if (!ticketCode.trim()) {
        removeTicket()
        return
      }

      // Get the current cart total (without any applied ticket)
      const currentOrderValue = items.reduce((sum, item) => {
        const price =
          typeof item.book.price === 'string'
            ? parseFloat(item.book.price)
            : item.book.price
        return sum + price * item.quantity
      }, 0)

      if (currentOrderValue <= 0) {
        showError('Adicione itens ao carrinho antes de aplicar um cupom.')
        return
      }

      try {
        const result = await validateTicket(ticketCode, currentOrderValue)

        if (result.success && result.data) {
          applyTicket(result.data)
          showSuccess(`Cupom "${ticketCode}" aplicado com sucesso!`)
        } else {
          showError(result.error || 'Erro ao validar cupom.')
        }
      } catch {
        showError('Erro inesperado ao validar cupom.')
      }
    },
    [items, validateTicket, applyTicket, removeTicket, showSuccess, showError],
  )

  return {
    // Cart state
    items,
    summary,
    appliedTicket,
    isEmpty,

    // User state
    currentUserWithAddresses,
    isAuthenticated,

    // Loading states
    isCheckingOut,
    isValidatingTicket: isValidating,

    // Modal state
    showAddressModal,

    // Cart operations
    updateQuantity,
    removeItem,

    // Ticket operations
    handleApplyTicket,

    // Checkout operations
    handleCheckout,
    handleAddressSelected,

    // Modal operations
    setShowAddressModal,
  }
}
