import { AddButton } from './components'
import * as S from './styles'

interface CustomerHeaderProps {
  onAddCustomer: () => void
}

export const CustomerHeader = ({ onAddCustomer }: CustomerHeaderProps) => {
  return (
    <S.Header>
      <S.HeaderContent>
        <S.Title>Clientes</S.Title>
        <S.Subtitle>Gerencie os clientes da sua livraria</S.Subtitle>
      </S.HeaderContent>
      <AddButton onClick={onAddCustomer} />
    </S.Header>
  )
}
