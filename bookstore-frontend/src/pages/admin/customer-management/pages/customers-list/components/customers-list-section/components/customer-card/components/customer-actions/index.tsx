import { DotsThreeOutline, UserMinus } from 'phosphor-react'
import { useState } from 'react'

import { Badge, Button, DropdownMenu } from '@/components'
import { useToast } from '@/providers'

import * as S from './styles'

interface CustomerActionsProps {
  status: 'Ativo' | 'Inativo' | 'Suspenso'
  customerId: string
  onInactivateUser?: (
    userId: string,
  ) => Promise<{ success: boolean; error?: string }>
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
  customerId,
  onInactivateUser,
}: CustomerActionsProps) => {
  const [isInactivating, setIsInactivating] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { addToast } = useToast()

  const handleInactivateClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirmInactivate = async () => {
    if (!onInactivateUser) return

    setIsInactivating(true)
    try {
      const result = await onInactivateUser(customerId)
      if (result.success) {
        addToast('Cliente inativado com sucesso!', 'success')
        setShowConfirmation(false)
      } else {
        addToast(result.error || 'Erro ao inativar cliente', 'error')
      }
    } catch {
      addToast('Erro ao inativar cliente', 'error')
    } finally {
      setIsInactivating(false)
    }
  }

  const handleCancelInactivate = () => {
    setShowConfirmation(false)
  }

  const dropdownItems = []

  // Only show inactivate option if user is active and the function is available
  if (status === 'Ativo' && onInactivateUser) {
    dropdownItems.push({
      'data-testid': 'inactivate-user-button',
      id: 'inactivate',
      label: 'Inativar Cliente',
      icon: <UserMinus size={16} />,
      variant: 'danger' as const,
      onClick: handleInactivateClick,
    })
  }

  const dropdownTrigger = (
    <Button variant="ghost" size="sm">
      <DotsThreeOutline size={16} />
    </Button>
  )

  if (showConfirmation) {
    return (
      <S.CustomerActions>
        <Badge
          data-testid="customer-status-badge"
          variant={getStatusVariant(status)}
          size="sm"
        >
          {status}
        </Badge>
        <S.ConfirmationContainer>
          <S.ConfirmationText>Inativar cliente?</S.ConfirmationText>
          <S.ConfirmationActions>
            <Button
              data-testid="cancel-inactivation-button"
              variant="ghost"
              size="sm"
              onClick={handleCancelInactivate}
              disabled={isInactivating}
            >
              Cancelar
            </Button>
            <Button
              data-testid="confirm-inactivation-button"
              variant="danger"
              size="sm"
              onClick={handleConfirmInactivate}
              loading={isInactivating}
            >
              Confirmar
            </Button>
          </S.ConfirmationActions>
        </S.ConfirmationContainer>
      </S.CustomerActions>
    )
  }

  return (
    <S.CustomerActions>
      <Badge variant={getStatusVariant(status)} size="sm">
        {status}
      </Badge>
      {dropdownItems.length > 0 ? (
        <DropdownMenu
          trigger={dropdownTrigger}
          items={dropdownItems}
          align="right"
        />
      ) : (
        <Button
          data-testid="customer-actions-button"
          variant="ghost"
          size="sm"
          disabled
        >
          <DotsThreeOutline size={16} />
        </Button>
      )}
    </S.CustomerActions>
  )
}
