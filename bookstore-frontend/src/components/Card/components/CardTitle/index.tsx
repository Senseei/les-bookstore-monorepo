import React from 'react'

import { StyledCardTitle } from './styles'

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
    <StyledCardTitle className={className} {...props}>
      {children}
    </StyledCardTitle>
  )
}
