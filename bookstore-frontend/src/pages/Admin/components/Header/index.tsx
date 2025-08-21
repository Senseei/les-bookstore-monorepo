import { Book, Books, Users } from 'phosphor-react'
import { NavLink } from 'react-router'

import { APP_ROUTES } from '../../../../routes/constants'
import * as S from './styles'

export const AdminHeader = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.Title>
          <Book size={32} />
          Bookstore Admin
        </S.Title>
        <nav>
          <NavLink to={APP_ROUTES.admin.customers}>
            <Users size={24} />
            <span>Clientes</span>
          </NavLink>
          <NavLink to={APP_ROUTES.admin.books}>
            <Books size={24} />
            <span>Livros</span>
          </NavLink>
        </nav>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
