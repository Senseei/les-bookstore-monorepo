import { Calendar } from 'phosphor-react'

import * as S from './styles'

interface LastOrderProps {
  lastOrder: string
}

export const LastOrder = ({ lastOrder }: LastOrderProps) => {
  return (
    <S.LastOrderSection>
      <S.LastOrderInfo>
        <Calendar size={12} />
        <S.LastOrderDate>{lastOrder}</S.LastOrderDate>
      </S.LastOrderInfo>
      <S.LastOrderLabel>Último Pedido</S.LastOrderLabel>
    </S.LastOrderSection>
  )
}
