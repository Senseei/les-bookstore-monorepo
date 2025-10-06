import { House } from 'phosphor-react'

import * as S from './styles'

export const ErrorPage = () => {
  return (
    <S.Container>
      <S.ErrorCard>
        <S.ErrorCodeContainer>
          <S.ErrorCode>404</S.ErrorCode>
          <S.ErrorIcon>
            <House size={48} weight="fill" />
          </S.ErrorIcon>
        </S.ErrorCodeContainer>

        <S.Title>Oops! Página não encontrada</S.Title>
        <S.Message>
          Está perdido? Esse caminho pode não estar disponível ou você não tem
          as permissões necessárias.
        </S.Message>
      </S.ErrorCard>
    </S.Container>
  )
}
