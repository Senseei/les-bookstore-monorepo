import React from 'react'

import { StyledCardFooter } from './styles'

interface CardFooterProps {
  children?: React.ReactNode
  className?: string
}

export const CardFooter = ({
  children,
  className,
  ...props
}: CardFooterProps) => {
  return (
    <StyledCardFooter className={className} {...props}>
      {children}
    </StyledCardFooter>
  )
}
