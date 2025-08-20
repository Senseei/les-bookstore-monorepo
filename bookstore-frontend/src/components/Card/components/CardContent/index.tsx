import React from 'react'

import * as S from './styles'

interface CardContentProps {
  children?: React.ReactNode
  className?: string
}

export const CardContent = ({
  children,
  className,
  ...props
}: CardContentProps) => {
  return (
    <S.StyledCardContent className={className} {...props}>
      {children}
    </S.StyledCardContent>
  )
}
