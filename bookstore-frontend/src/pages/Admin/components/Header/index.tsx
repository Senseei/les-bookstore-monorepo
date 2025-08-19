import { TabButton } from './components'

interface AdminHeaderProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const AdminHeader = ({ activeTab, onTabChange }: AdminHeaderProps) => {
  return (
    <header>
      <h1>Bookstore Admin</h1>
      <nav>
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
      </nav>
    </header>
  )
}
