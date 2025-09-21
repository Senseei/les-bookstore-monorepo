import { useEffect, useState } from 'react'

import type { MinUserDTO } from '@/dtos/user/min-user'
import { useUser } from '@/hooks'
import { useToast } from '@/providers/toast/use-toast'

import type { Customer } from './components/customers-list-section/types'

interface CustomerListState {
  searchTerm: string
  showFilters: boolean
  statusFilter: string
  rankingFilter: string
  currentPage: number
  pageSize: number
}

/**
 * Convert MinUserDTO to Customer format for the UI
 */
const mapUserToCustomer = (user: MinUserDTO): Customer => {
  // Format address as a single string
  const address = `${user.address.street} - ${user.address.city}, ${user.address.state}`

  // Format last order date
  const lastOrder = user.lastOrder
    ? new Date(user.lastOrder).toLocaleDateString('pt-BR')
    : null

  return {
    id: user.id, // Convert string to number for compatibility
    name: user.name,
    customerId: user.id,
    email: user.email,
    status: user.status,
    ranking: user.ranking,
    phoneNumber: user.phoneNumber, // Use the phone number as-is
    address,
    lastOrder: lastOrder || 'Nenhum pedido',
  }
}

/**
 * Customer List Hook
 * Manages customer list page state and logic with pagination
 */
export const useCustomerList = () => {
  const {
    users,
    totalCount,
    isLoading,
    error,
    getAllUsers,
    clearError,
    inactivateUser,
  } = useUser()
  const { addToast } = useToast()

  const [state, setState] = useState<CustomerListState>({
    searchTerm: '',
    showFilters: false,
    statusFilter: '',
    rankingFilter: '',
    currentPage: 1,
    pageSize: 10,
  })

  // Convert users to customers
  const customers: Customer[] = users.map(mapUserToCustomer)

  // Load customers with current filters and pagination (with debounce for search)
  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => {
        const loadCustomers = async () => {
          const params = {
            page: state.currentPage,
            pageSize: state.pageSize,
            ...(state.searchTerm && { search: state.searchTerm }),
            ...(state.statusFilter && { status: state.statusFilter }),
            ...(state.rankingFilter && {
              ranking: state.rankingFilter,
            }),
          }

          const result = await getAllUsers(params)
          if (!result.success && result.error) {
            addToast(result.error, 'error')
          }
        }

        loadCustomers()
      },
      state.searchTerm ? 500 : 0,
    ) // 500ms delay for search, immediate for other filters

    return () => window.clearTimeout(timeoutId)
  }, [
    state.searchTerm,
    state.statusFilter,
    state.rankingFilter,
    state.currentPage,
    state.pageSize,
    getAllUsers,
    addToast,
  ])

  // Handle error display
  useEffect(() => {
    if (error) {
      addToast(error, 'error')
      clearError()
    }
  }, [error, addToast, clearError])

  const setSearchTerm = (value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value, currentPage: 1 }))
  }

  const setShowFilters = (value: boolean) => {
    setState((prev) => ({ ...prev, showFilters: value }))
  }

  const setStatusFilter = (value: string) => {
    setState((prev) => ({ ...prev, statusFilter: value, currentPage: 1 }))
  }

  const setRankingFilter = (value: string) => {
    setState((prev) => ({ ...prev, rankingFilter: value, currentPage: 1 }))
  }

  const setCurrentPage = (page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }))
  }

  const setPageSize = (size: number) => {
    setState((prev) => ({ ...prev, pageSize: size, currentPage: 1 }))
  }

  const clearFilters = () => {
    setState({
      searchTerm: '',
      showFilters: false,
      statusFilter: '',
      rankingFilter: '',
      currentPage: 1,
      pageSize: state.pageSize, // Keep current page size
    })
  }

  const toggleFilters = () => {
    setState((prev) => ({ ...prev, showFilters: !prev.showFilters }))
  }

  return {
    // Data
    customers,
    totalCustomers: totalCount,
    isLoading,

    // Pagination
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    totalPages: Math.ceil(totalCount / state.pageSize),

    // Search and filters state
    searchTerm: state.searchTerm,
    showFilters: state.showFilters,
    statusFilter: state.statusFilter,
    rankingFilter: state.rankingFilter,

    // Actions
    setSearchTerm,
    setShowFilters,
    setStatusFilter,
    setRankingFilter,
    setCurrentPage,
    setPageSize,
    clearFilters,
    toggleFilters,
    inactivateUser,
  }
}
