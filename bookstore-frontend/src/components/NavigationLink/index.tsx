import type { ReactNode } from 'react'

import * as S from './styles'

interface NavigationLinkProps {
  to: string
  children: ReactNode
  variant?: 'default' | 'primary' | 'muted'
  underline?: boolean
}

export const NavigationLink = ({
  to,
  children,
  variant = 'default',
  underline = true,
}: NavigationLinkProps) => {
  return (
    <S.StyledNavigationLink to={to} variant={variant} underline={underline}>
      {children}
    </S.StyledNavigationLink>
  )
}
