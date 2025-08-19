import React from 'react'

import { StyledCard } from './styles'

interface CardProps {
  children?: React.ReactNode
  className?: string
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <StyledCard className={className} {...props}>
      {children}
    </StyledCard>
  )
}
