import React from 'react'

import * as S from './styles'

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
    <S.StyledCardFooter className={className} {...props}>
      {children}
    </S.StyledCardFooter>
  )
}
