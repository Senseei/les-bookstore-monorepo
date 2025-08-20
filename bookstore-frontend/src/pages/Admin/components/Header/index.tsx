import { TabButton } from './components'
import * as S from './styles'

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
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.Title>Bookstore Admin</S.Title>
        <S.Navigation>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </S.Navigation>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
