import React from 'react'

import * as S from './styles'

interface CardDescriptionProps {
  children?: React.ReactNode
  className?: string
}

export const CardDescription = ({
  children,
  className,
  ...props
}: CardDescriptionProps) => {
  return (
    <S.StyledCardDescription className={className} {...props}>
      {children}
    </S.StyledCardDescription>
  )
}
