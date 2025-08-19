import { TabButton } from './components'
import { HeaderContainer, HeaderContent, Navigation, Title } from './styles'

interface Tab {
  id: string
  label: string
}

interface AdminHeaderProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  tabs: Tab[]
}

export const AdminHeader = ({
  activeTab,
  onTabChange,
  tabs,
}: AdminHeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>Bookstore Admin</Title>
        <Navigation>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  )
}
