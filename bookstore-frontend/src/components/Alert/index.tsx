import { CheckCircle, Info, Warning, X, XCircle } from 'phosphor-react'
import type { ReactNode } from 'react'

import * as S from './styles'

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  children: ReactNode
  onClose?: () => void
  isVisible?: boolean
}

const getIcon = (variant: AlertProps['variant']) => {
  switch (variant) {
    case 'success':
      return <CheckCircle weight="fill" size={20} />
    case 'error':
      return <XCircle weight="fill" size={20} />
    case 'warning':
      return <Warning weight="fill" size={20} />
    default:
      return <Info weight="fill" size={20} />
  }
}

export const Alert = ({
  variant = 'info',
  children,
  onClose,
  isVisible = true,
}: AlertProps) => {
  if (!isVisible) return null

  return (
    <S.Alert variant={variant} isVisible={isVisible}>
      <S.AlertIcon>{getIcon(variant)}</S.AlertIcon>
      <S.AlertMessage>{children}</S.AlertMessage>
      {onClose && (
        <S.AlertCloseButton onClick={onClose}>
          <X size={18} weight="bold" />
        </S.AlertCloseButton>
      )}
    </S.Alert>
  )
}
