import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components'
import { PageHeader } from '@/pages/admin/layout/components'

import { CustomersListSection, SearchAndFilters } from './components'
import type { Customer } from './components/customers-list-section/types'
import * as S from './styles'

export const CustomersList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [rankingFilter, setRankingFilter] = useState('')

  // Mock data for demonstration
  const mockCustomers: Customer[] = [
    {
      id: 1,
      name: 'João Silva',
      customerId: 'CUST-001',
      email: 'joao@email.com',
      status: 'Ativo',
      ranking: 5,
      phoneAreaCode: '11',
      phoneNumber: '99999-1234',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      lastOrder: '15/08/2025',
    },
    {
      id: 2,
      name: 'Maria Santos',
      customerId: 'CUST-002',
      email: 'maria@email.com',
      status: 'Inativo',
      ranking: 3,
      phoneAreaCode: '21',
      phoneNumber: '98888-5678',
      address: 'Av. Copacabana, 456 - Rio de Janeiro, RJ',
      lastOrder: '02/07/2025',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      customerId: 'CUST-003',
      email: 'pedro@email.com',
      status: 'Ativo',
      ranking: 4,
      phoneAreaCode: '31',
      phoneNumber: '97777-9101',
      address: 'Rua da Liberdade, 789 - Belo Horizonte, MG',
      lastOrder: '20/08/2025',
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      customerId: 'CUST-004',
      email: 'ana@email.com',
      status: 'Suspenso',
      ranking: 2,
      phoneAreaCode: '85',
      phoneNumber: '96666-1213',
      address: 'Rua do Sol, 321 - Fortaleza, CE',
      lastOrder: '10/06/2025',
    },
    {
      id: 5,
      name: 'Carlos Ferreira',
      customerId: 'CUST-005',
      email: 'carlos@email.com',
      status: 'Ativo',
      ranking: 5,
      phoneAreaCode: '51',
      phoneNumber: '95555-1415',
      address: 'Av. Independência, 654 - Porto Alegre, RS',
      lastOrder: '18/08/2025',
    },
  ]

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || customer.status === statusFilter
    const matchesRanking =
      !rankingFilter || customer.ranking.toString() === rankingFilter
    return matchesSearch && matchesStatus && matchesRanking
  })

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setRankingFilter('')
  }

  return (
    <S.CustomerContainer>
      <PageHeader
        title="Clientes"
        subtitle="Gerencie os clientes da sua livraria"
      />

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Busca e Filtros</CardTitle>
          <CardDescription>
            Use a busca e os filtros para encontrar clientes específicos.
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
      <CustomersListSection customers={filteredCustomers} />
    </S.CustomerContainer>
  )
}
