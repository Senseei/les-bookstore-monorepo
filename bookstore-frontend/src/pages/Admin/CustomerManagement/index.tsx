import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components'

import { CustomerHeader, CustomerList, SearchAndFilters } from './components'
import type { Customer } from './components/CustomerList'
import * as S from './styles'

export const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [rankingFilter, setRankingFilter] = useState('')

  // Mock data for demonstration
  const mockCustomers: Customer[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      status: 'Ativo',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      status: 'Inativo',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      status: 'Ativo',
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana@email.com',
      status: 'Suspenso',
    },
    {
      id: 5,
      name: 'Carlos Ferreira',
      email: 'carlos@email.com',
      status: 'Ativo',
    },
  ]

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddCustomer = () => {
    // TODO: Navigate to new customer form or open modal
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setRankingFilter('')
  }

  return (
    <S.CustomerContainer>
      <CustomerHeader onAddCustomer={handleAddCustomer} />

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search and Filters</CardTitle>
          <CardDescription>
            Use the search bar and filters to find customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            rankingFilter={rankingFilter}
            onRankingChange={setRankingFilter}
            onClearFilters={clearFilters}
            resultsCount={filteredCustomers.length}
            totalCount={mockCustomers.length}
          />
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>Manage your customer database</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerList customers={filteredCustomers} />
        </CardContent>
      </Card>
    </S.CustomerContainer>
  )
}
