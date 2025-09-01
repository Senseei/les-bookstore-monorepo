import type { ReactNode } from 'react'

import * as S from './styles'

interface NavigationButtonProps {
  to: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export const NavigationButton = ({
  to,
  children,
  variant = 'primary',
}: NavigationButtonProps) => {
  return (
    <S.StyledNavigationButton to={to} variant={variant}>
      {children}
    </S.StyledNavigationButton>
  )
}
