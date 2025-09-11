import { Card, CardContent, CardHeader } from '@/components'

import type { Customer } from '../../types'
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
  onViewDetails: (customerId: string) => void
  onMoreOptions: (customerId: string) => void
}

export const CustomerCard = ({
  customer,
  onViewDetails,
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
          // phoneAreaCode={customer.phoneAreaCode}
          phoneNumber={customer.phoneNumber}
          address={customer.address}
        />

        <LastOrder lastOrder={customer.lastOrder} />

        <ActionButtons onViewDetails={() => onViewDetails(customer.id)} />
      </CardContent>
    </Card>
  )
}
