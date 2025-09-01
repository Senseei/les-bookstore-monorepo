import React from 'react'

import * as S from './styles'

interface CardTitleProps {
  children?: React.ReactNode
  className?: string
}

export const CardTitle = ({
  children,
  className,
  ...props
}: CardTitleProps) => {
  return (
    <S.StyledCardTitle className={className} {...props}>
      {children}
    </S.StyledCardTitle>
  )
}
