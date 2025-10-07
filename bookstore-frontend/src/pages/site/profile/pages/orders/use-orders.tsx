import { useEffect, useState } from 'react'

import { useOrder } from '@/hooks'
import { useToast } from '@/providers'

interface OrderFilters {
  startDate?: Date
  endDate?: Date
  search?: string
}

export const useOrders = () => {
  const {
    isLoading,
    error,
    totalOrders,
    orderStatistics,
    sortedOrders,
    recentOrders,
    refreshOrders,
    filterOrdersByDateRange,
  } = useOrder()

  const { addToast } = useToast()
  const [filters, setFilters] = useState<OrderFilters>({})
  const [filteredOrders, setFilteredOrders] = useState(sortedOrders)

  // Apply filters when orders or filters change
  useEffect(() => {
    let filtered = [...sortedOrders]

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      filtered = filterOrdersByDateRange(filters.startDate, filters.endDate)
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter((order) =>
        order.items.some(
          (item) =>
            item.book.title.toLowerCase().includes(searchTerm) ||
            item.book.author.toLowerCase().includes(searchTerm) ||
            item.book.isbn.toLowerCase().includes(searchTerm),
        ),
      )
    }

    setFilteredOrders(filtered)
  }, [sortedOrders, filters, filterOrdersByDateRange])

  const handleRefreshOrders = async () => {
    const result = await refreshOrders()

    if (!result.success) {
      addToast(
        'Não foi possível carregar seus pedidos. Tente novamente.',
        'error',
      )
    }
  }

  const handleFilterChange = (newFilters: Partial<OrderFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  return {
    // Data
    orders: filteredOrders,
    allOrders: sortedOrders,
    recentOrders,
    totalOrders,
    orderStatistics,

    // State
    isLoading,
    error,
    filters,

    // Actions
    handleRefreshOrders,
    handleFilterChange,
    clearFilters,

    // Utils
    formatCurrency,
    formatDate,
  }
}
