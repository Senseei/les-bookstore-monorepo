import * as S from './styles'

export interface Customer {
  id: number
  name: string
  email: string
  status: string
}

interface CustomerListProps {
  customers: Customer[]
}

export const CustomerList = ({ customers }: CustomerListProps) => {
  return (
    <>
      {customers.length > 0 ? (
        <S.CustomerGrid>
          {customers.map((customer) => (
            <S.CustomerCard key={customer.id}>
              <S.CustomerInfo>
                <S.CustomerName>{customer.name}</S.CustomerName>
                <S.CustomerEmail>{customer.email}</S.CustomerEmail>
              </S.CustomerInfo>
              <S.CustomerStatus status={customer.status}>
                {customer.status}
              </S.CustomerStatus>
            </S.CustomerCard>
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
