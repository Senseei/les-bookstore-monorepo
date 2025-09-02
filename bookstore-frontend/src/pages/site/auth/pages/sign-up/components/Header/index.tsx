import { BookOpen } from 'phosphor-react'

import * as S from './styles'

export const Header = () => {
  return (
    <S.Container>
      <S.LogoLink href="/">
        <S.LogoIcon>
          <BookOpen size={20} weight="bold" />
        </S.LogoIcon>
        <S.LogoText>BookStore</S.LogoText>
      </S.LogoLink>

      <S.Title>Criar Conta</S.Title>
      <S.Subtitle>Preencha seus dados para começar a comprar</S.Subtitle>
    </S.Container>
  )
}
