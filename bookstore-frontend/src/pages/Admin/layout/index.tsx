import { Outlet } from 'react-router'

import { AdminHeader } from './components'
import * as S from './styles'

export const AdminLayout = () => {
  return (
    <S.LayoutContainer>
      <AdminHeader />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  )
}
