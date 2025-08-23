import { DotsThreeOutline } from 'phosphor-react'

import { Badge, Button } from '@/components'

import * as S from './styles'

interface CustomerActionsProps {
  status: 'Ativo' | 'Inativo' | 'Suspenso'
  onMoreOptions: () => void
}

const getStatusVariant = (
  status: string,
): 'default' | 'secondary' | 'success' | 'warning' | 'danger' => {
  switch (status) {
    case 'Ativo':
      return 'success'
    case 'Suspenso':
      return 'danger'
    default:
      return 'secondary'
  }
}

export const CustomerActions = ({
  status,
  onMoreOptions,
}: CustomerActionsProps) => {
  return (
    <S.CustomerActions>
      <Badge variant={getStatusVariant(status)} size="sm">
        {status}
      </Badge>
      <Button variant="ghost" size="sm" onClick={onMoreOptions}>
        <DotsThreeOutline size={16} />
      </Button>
    </S.CustomerActions>
  )
}
