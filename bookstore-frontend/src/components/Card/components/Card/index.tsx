import React from 'react'

import * as S from './styles'

interface CardProps {
  children?: React.ReactNode
  className?: string
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <S.StyledCard className={className} {...props}>
      {children}
    </S.StyledCard>
  )
}
