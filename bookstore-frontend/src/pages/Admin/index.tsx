import { useState } from 'react'

import { AdminHeader } from './components'
import { ADMIN_TABS } from './constants'
import { CustomerManagement } from './CustomerManagement'
import { LayoutContainer, MainContent } from './styles'

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState(ADMIN_TABS[0].id)

  return (
    <LayoutContainer>
      <AdminHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={ADMIN_TABS}
      />
      <MainContent>
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'books' && <div>Book Management Content</div>}
      </MainContent>
    </LayoutContainer>
  )
}
