import React from 'react'

import { StyledCardContent } from './styles'

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
    <StyledCardContent className={className} {...props}>
      {children}
    </StyledCardContent>
  )
}
