import type { ReactNode } from 'react'
import { useState } from 'react'

import * as S from './styles'

interface DropdownMenuItem {
  id: string
  label: string
  icon?: ReactNode
  variant?: 'default' | 'danger'
  onClick: () => void
}

interface DropdownMenuProps {
  trigger: ReactNode
  items: DropdownMenuItem[]
  align?: 'left' | 'right'
}

export const DropdownMenu = ({
  trigger,
  items,
  align = 'right',
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const handleItemClick = (item: DropdownMenuItem) => {
    item.onClick()
    closeDropdown()
  }

  return (
    <S.DropdownContainer>
      <S.DropdownTrigger onClick={toggleDropdown}>{trigger}</S.DropdownTrigger>

      {isOpen && (
        <S.DropdownMenu align={align}>
          {items.map((item) => (
            <S.DropdownMenuItem
              key={item.id}
              variant={item.variant}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && <S.ItemIcon>{item.icon}</S.ItemIcon>}
              <S.ItemLabel>{item.label}</S.ItemLabel>
            </S.DropdownMenuItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  )
}
