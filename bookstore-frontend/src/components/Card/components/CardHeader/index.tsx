import React from 'react'

import * as S from './styles'

interface CardHeaderProps {
  children?: React.ReactNode
  className?: string
}

export const CardHeader = ({
  children,
  className,
  ...props
}: CardHeaderProps) => {
  return (
    <S.StyledCardHeader className={className} {...props}>
      {children}
    </S.StyledCardHeader>
  )
}
