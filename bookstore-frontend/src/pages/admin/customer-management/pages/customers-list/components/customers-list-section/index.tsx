import { CustomerCard } from './components'
import * as S from './styles'
import type { Customer } from './types'

interface CustomersListSectionProps {
  customers: Customer[]
}

export const CustomersListSection = ({
  customers,
}: CustomersListSectionProps) => {
  const handleViewDetails = (customerId: number) => {
    // TODO: Navigate to customer details
    // eslint-disable-next-line no-console
    console.log('View details for customer:', customerId)
  }

  const handleEditCustomer = (customerId: number) => {
    // TODO: Navigate to customer edit
    // eslint-disable-next-line no-console
    console.log('Edit customer:', customerId)
  }

  const handleMoreOptions = (customerId: number) => {
    // TODO: Show options menu
    // eslint-disable-next-line no-console
    console.log('More options for customer:', customerId)
  }

  return (
    <>
      {customers.length > 0 ? (
        <S.CustomerGrid>
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onViewDetails={handleViewDetails}
              onEditCustomer={handleEditCustomer}
              onMoreOptions={handleMoreOptions}
            />
          ))}
        </S.CustomerGrid>
      ) : (
        <S.EmptyState>
          <p>Nenhum cliente encontrado com os filtros aplicados.</p>
        </S.EmptyState>
      )}
    </>
  )
}

// Export the Customer type for use in parent components
export type { Customer }
