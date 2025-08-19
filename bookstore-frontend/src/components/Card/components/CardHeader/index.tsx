import React from 'react'

import { StyledCardHeader } from './styles'

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
    <StyledCardHeader className={className} {...props}>
      {children}
    </StyledCardHeader>
  )
}
