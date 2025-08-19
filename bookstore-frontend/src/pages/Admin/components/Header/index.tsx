import { TabButton } from './components'
import { HeaderContainer, HeaderContent, Navigation, Title } from './styles'

interface AdminHeaderProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const AdminHeader = ({ activeTab, onTabChange }: AdminHeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>Bookstore Admin</Title>
        <Navigation>
          <TabButton
            label="Customers"
            isActive={activeTab === 'customers'}
            onClick={() => onTabChange('customers')}
          />
          <TabButton
            label="Books"
            isActive={activeTab === 'books'}
            onClick={() => onTabChange('books')}
          />
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  )
}
