import { NavigationButton } from '@/components'

import * as S from './styles'

interface ActionButtonsProps {
  customerId: string
}

export const ActionButtons = ({ customerId }: ActionButtonsProps) => {
  return (
    <S.ActionButtons>
      <NavigationButton
        to={`/admin/customers/${customerId}`}
        variant="secondary"
      >
        Ver Detalhes
      </NavigationButton>
    </S.ActionButtons>
  )
}
