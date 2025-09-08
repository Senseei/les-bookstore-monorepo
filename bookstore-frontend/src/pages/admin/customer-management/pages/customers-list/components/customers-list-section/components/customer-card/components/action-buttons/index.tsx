import { Button } from '@/components'

import * as S from './styles'

interface ActionButtonsProps {
  onViewDetails: () => void
}

export const ActionButtons = ({ onViewDetails }: ActionButtonsProps) => {
  return (
    <S.ActionButtons>
      <Button variant="outline" size="sm" onClick={onViewDetails}>
        Ver Detalhes
      </Button>
    </S.ActionButtons>
  )
}
