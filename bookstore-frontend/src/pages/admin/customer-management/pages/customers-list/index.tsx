import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  ToastContainer,
} from '@/components'
import { useToast } from '@/hooks/use-toast'
import { PageHeader } from '@/pages/admin/layout/components'

import { CustomersListSection, SearchAndFilters } from './components'
import { useCustomerList } from './hooks'
import * as S from './styles'

export const CustomersList = () => {
  const { toasts, removeToast } = useToast()
  const {
    customers,
    totalCustomers,
    isLoading,
    currentPage,
    pageSize,
    totalPages,
    searchTerm,
    showFilters,
    statusFilter,
    rankingFilter,
    setSearchTerm,
    setStatusFilter,
    setRankingFilter,
    setCurrentPage,
    setPageSize,
    clearFilters,
    toggleFilters,
  } = useCustomerList()

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
            onToggleFilters={toggleFilters}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            rankingFilter={rankingFilter}
            onRankingChange={setRankingFilter}
            onClearFilters={clearFilters}
            resultsCount={customers.length}
            totalCount={totalCustomers}
          />
        </CardContent>
      </Card>

      {/* Customer List */}
      {isLoading ? (
        <Card>
          <CardContent>
            <p>Carregando clientes...</p>
          </CardContent>
        </Card>
      ) : (
        <CustomersListSection customers={customers} />
      )}

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <Card>
          <CardContent>
            <S.PaginationContainer>
              <S.PaginationInfo>
                Mostrando {customers.length} de {totalCustomers} clientes
              </S.PaginationInfo>
              <S.PaginationControls>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <S.PageInfo>
                  Página {currentPage} de {totalPages}
                </S.PageInfo>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
                <Select
                  value={pageSize.toString()}
                  onChange={(value) => setPageSize(Number(value))}
                  options={[
                    { value: '5', label: '5 por página' },
                    { value: '10', label: '10 por página' },
                    { value: '20', label: '20 por página' },
                    { value: '50', label: '50 por página' },
                  ]}
                  size="sm"
                />
              </S.PaginationControls>
            </S.PaginationContainer>
          </CardContent>
        </Card>
      )}

      {/* Toast Container for error notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </S.CustomerContainer>
  )
}
