import { useState } from 'react'
import { Outlet } from 'react-router'

import { AdminHeader } from './components'
import { ADMIN_TABS } from './constants'
import * as S from './styles'

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState(ADMIN_TABS[0].id)

  return (
    <S.LayoutContainer>
      <AdminHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={ADMIN_TABS}
      />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  )
}
