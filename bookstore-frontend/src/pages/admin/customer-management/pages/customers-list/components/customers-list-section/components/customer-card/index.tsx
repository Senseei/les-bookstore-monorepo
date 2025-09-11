import { Card, CardContent, CardHeader } from '@/components'
import type { Customer } from '@/pages/Admin/Customers/components/CustomersListSection/types'

import {
  ActionButtons,
  ContactInfo,
  CustomerActions,
  CustomerHeader,
  LastOrder,
} from './components'
import * as S from './styles'

interface CustomerCardProps {
  customer: Customer
  onViewDetails: (customerId: number) => void
  onEditCustomer: (customerId: number) => void
  onMoreOptions: (customerId: number) => void
}

export const CustomerCard = ({
  customer,
  onViewDetails,
  onEditCustomer,
  onMoreOptions,
}: CustomerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <S.CustomerCardHeader>
          <CustomerHeader
            name={customer.name}
            customerId={customer.customerId}
            ranking={customer.ranking}
          />
          <CustomerActions
            status={customer.status}
            onMoreOptions={() => onMoreOptions(customer.id)}
          />
        </S.CustomerCardHeader>
      </CardHeader>
      <CardContent>
        <ContactInfo
          email={customer.email}
          phoneAreaCode={customer.phoneAreaCode}
          phoneNumber={customer.phoneNumber}
          address={customer.address}
        />

        <LastOrder lastOrder={customer.lastOrder} />

        <ActionButtons
          onViewDetails={() => onViewDetails(customer.id)}
          onEditCustomer={() => onEditCustomer(customer.id)}
        />
      </CardContent>
    </Card>
  )
}
