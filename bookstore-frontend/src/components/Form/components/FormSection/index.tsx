import type { ReactNode } from 'react'

import * as S from './styles'

interface FormSectionProps {
  title?: string
  children: ReactNode
  className?: string
}

export const FormSection = ({
  title,
  children,
  className,
}: FormSectionProps) => {
  return (
    <S.Section className={className}>
      {title && <S.SectionTitle>{title}</S.SectionTitle>}
      <S.SectionContent>{children}</S.SectionContent>
    </S.Section>
  )
}
