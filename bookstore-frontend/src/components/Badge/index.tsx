import React from 'react'

import * as S from './styles'

export interface BadgeProps {
  children?: React.ReactNode
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => {
  return (
    <S.StyledBadge variant={variant} size={size}>
      {children}
    </S.StyledBadge>
  )
}
