import React from 'react'
import { Outlet } from 'react-router'

import { Footer, Header } from './components'
import * as S from './styles'

interface LayoutProps {
  children?: React.ReactNode
}

export const SiteLayout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <Header />
      <S.MainContent>{children || <Outlet />}</S.MainContent>
      <Footer />
    </S.LayoutContainer>
  )
}
