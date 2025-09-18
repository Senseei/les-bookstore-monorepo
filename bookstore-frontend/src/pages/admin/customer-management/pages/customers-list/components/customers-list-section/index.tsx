import { CustomerCard } from './components'
import * as S from './styles'
import type { Customer } from './types'

interface CustomersListSectionProps {
  customers: Customer[]
  onInactivateUser?: (
    userId: string,
  ) => Promise<{ success: boolean; error?: string }>
}

export const CustomersListSection = ({
  customers,
  onInactivateUser,
}: CustomersListSectionProps) => {
  return (
    <>
      {customers.length > 0 ? (
        <S.CustomerGrid>
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onInactivateUser={onInactivateUser}
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
