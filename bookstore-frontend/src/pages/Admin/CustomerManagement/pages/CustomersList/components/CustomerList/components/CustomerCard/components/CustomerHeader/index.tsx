import { Star } from 'phosphor-react'

import * as S from './styles'

interface CustomerHeaderProps {
  name: string
  customerId: string
  ranking: number
}

const getRankingStars = (ranking: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={12}
      weight={i < ranking ? 'fill' : 'regular'}
      color={i < ranking ? '#4FBDB8' : '#98979B'}
    />
  ))
}

export const CustomerHeader = ({
  name,
  customerId,
  ranking,
}: CustomerHeaderProps) => {
  return (
    <S.CustomerMainInfo>
      <S.CustomerName>{name}</S.CustomerName>
      <S.CustomerID>{customerId}</S.CustomerID>
      <S.RankingContainer>
        <S.StarsContainer>{getRankingStars(ranking)}</S.StarsContainer>
        <S.RankingText>Ranking {ranking}/5</S.RankingText>
      </S.RankingContainer>
    </S.CustomerMainInfo>
  )
}
