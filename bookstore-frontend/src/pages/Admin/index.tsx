import { useState } from 'react'

import { AdminHeader } from './components'
import { CustomerManagement } from './CustomerManagement'

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('customers')

  return (
    <div>
      <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'books' && <div>Book Management Content</div>}
      </main>
    </div>
  )
}
