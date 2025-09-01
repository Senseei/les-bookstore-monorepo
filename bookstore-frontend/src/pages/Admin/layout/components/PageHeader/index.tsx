import type { ReactNode } from 'react'

import * as S from './styles'

interface PageHeaderProps {
  title: string
  subtitle: string
  actionButton?: ReactNode
}

export const PageHeader = ({
  title,
  subtitle,
  actionButton,
}: PageHeaderProps) => {
  return (
    <S.Header>
      <S.HeaderContent>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.HeaderContent>
      {actionButton}
    </S.Header>
  )
}
