import React from 'react'

import { StyledCardDescription } from './styles'

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
    <StyledCardDescription className={className} {...props}>
      {children}
    </StyledCardDescription>
  )
}
