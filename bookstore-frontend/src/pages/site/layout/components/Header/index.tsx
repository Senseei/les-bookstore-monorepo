import {
  BookOpen,
  CaretDown,
  List,
  MagnifyingGlass,
  ShoppingCart,
  User,
} from 'phosphor-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { Button } from '@/components'

import * as S from './styles'

export const Header = () => {
  // Mock hooks - these would be real in the actual implementation
  const user = null // Mock user state
  const cartItemsCount = 0 // Mock cart count
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    // Mock logout function
    navigate('/')
    setIsMenuOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleInputChange = (e: { target: { value: string } }) => {
    setSearchQuery(e.target.value)
  }

  return (
    <S.HeaderContainer>
      <S.Container>
        <S.HeaderContent>
          {/* Logo */}
          <S.LogoContainer>
            <Link to="/">
              <S.LogoWrapper>
                <S.LogoIcon>
                  <BookOpen size={24} weight="bold" />
                </S.LogoIcon>
                <S.LogoText>BookStore</S.LogoText>
              </S.LogoWrapper>
            </Link>
          </S.LogoContainer>

          {/* Desktop Navigation */}
          <S.DesktopNav>
            <S.NavLink to="/catalog">Catálogo</S.NavLink>
          </S.DesktopNav>

          {/* Right side */}
          <S.RightSection>
            {/* Search */}
            <S.SearchContainer>
              <S.SearchForm onSubmit={handleSearch}>
                <S.SearchInput
                  type="text"
                  placeholder="Buscar livros..."
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <S.SearchIcon type="submit">
                  <MagnifyingGlass size={16} />
                </S.SearchIcon>
              </S.SearchForm>
            </S.SearchContainer>

            {/* Cart */}
            <S.CartContainer>
              <Link to="/cart">
                <S.CartButton>
                  <ShoppingCart size={24} />
                  {cartItemsCount > 0 && (
                    <S.CartBadge>
                      {cartItemsCount > 99 ? '99+' : cartItemsCount}
                    </S.CartBadge>
                  )}
                </S.CartButton>
              </Link>
            </S.CartContainer>

            {/* User menu */}
            {user ? (
              <S.UserMenuContainer>
                <S.UserMenuButton
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  isOpen={isMenuOpen}
                >
                  <S.UserAvatar>
                    <User size={16} />
                  </S.UserAvatar>
                  <S.UserName>Nome do Usuário</S.UserName>
                  <CaretDown size={16} />
                </S.UserMenuButton>

                {isMenuOpen && (
                  <S.UserDropdown>
                    <S.DropdownItem
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meu Perfil
                    </S.DropdownItem>
                    <S.DropdownItem
                      to="/orders"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meus Pedidos
                    </S.DropdownItem>
                    <S.DropdownItem
                      to="/addresses"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Endereços
                    </S.DropdownItem>
                    <S.DropdownItem
                      to="/payment-methods"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Cartões
                    </S.DropdownItem>
                    <S.DropdownDivider />
                    <S.DropdownButton onClick={handleLogout}>
                      Sair
                    </S.DropdownButton>
                  </S.UserDropdown>
                )}
              </S.UserMenuContainer>
            ) : (
              <S.AuthButtons>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Cadastrar
                  </Button>
                </Link>
              </S.AuthButtons>
            )}

            {/* Mobile menu button */}
            <S.MobileMenuButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              isOpen={isMenuOpen}
            >
              <List size={24} />
            </S.MobileMenuButton>
          </S.RightSection>
        </S.HeaderContent>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <S.MobileNav>
            <S.MobileNavItem to="/catalog">Catálogo</S.MobileNavItem>

            {/* Mobile search */}
            <S.MobileSearchForm onSubmit={handleSearch}>
              <S.MobileSearchInput
                type="text"
                placeholder="Buscar livros..."
                value={searchQuery}
                onChange={handleInputChange}
              />
              <S.MobileSearchIcon type="submit">
                <MagnifyingGlass size={16} />
              </S.MobileSearchIcon>
            </S.MobileSearchForm>
          </S.MobileNav>
        )}
      </S.Container>
    </S.HeaderContainer>
  )
}
