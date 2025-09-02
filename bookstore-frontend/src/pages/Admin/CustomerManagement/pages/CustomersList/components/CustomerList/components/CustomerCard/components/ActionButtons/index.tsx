import { Button } from '@/components'

import * as S from './styles'

interface ActionButtonsProps {
  onViewDetails: () => void
  onEditCustomer: () => void
}

export const ActionButtons = ({
  onViewDetails,
  onEditCustomer,
}: ActionButtonsProps) => {
  return (
    <S.ActionButtons>
      <Button variant="outline" size="sm" onClick={onViewDetails}>
        Ver Detalhes
      </Button>
      <Button variant="primary" size="sm" onClick={onEditCustomer}>
        Editar
      </Button>
    </S.ActionButtons>
  )
}
