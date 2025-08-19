import { AddButton } from './components'
import { Header, HeaderContent, Subtitle, Title } from './styles'

interface CustomerHeaderProps {
  onAddCustomer: () => void
}

export const CustomerHeader = ({ onAddCustomer }: CustomerHeaderProps) => {
  return (
    <Header>
      <HeaderContent>
        <Title>Clientes</Title>
        <Subtitle>Gerencie os clientes da sua livraria</Subtitle>
      </HeaderContent>
      <AddButton onClick={onAddCustomer} />
    </Header>
  )
}
