import styled, { css } from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const DropdownTrigger = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DropdownMenu = styled.div<{ align?: 'left' | 'right' }>`
  position: absolute;
  top: 100%;
  ${({ align }) =>
    align === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  min-width: 160px;
  background: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL_200};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.MD};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
  padding: ${({ theme }) => theme.SPACING.SM} 0;
`

export const DropdownMenuItem = styled.button<{
  variant?: 'default' | 'danger'
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => `${theme.SPACING.SM} ${theme.SPACING.MD}`};
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  transition: all ${({ theme }) => theme.TRANSITIONS.NORMAL};

  ${({ variant, theme }) =>
    variant === 'danger'
      ? css`
          color: ${theme.COLORS.ERROR_MAIN};

          &:hover {
            background-color: ${theme.COLORS.ERROR_MAIN};
            color: ${theme.COLORS.NEUTRAL_50};
          }

          &:active {
            background-color: ${theme.COLORS.ERROR_DARK};
            color: ${theme.COLORS.NEUTRAL_50};
          }
        `
      : css`
          color: ${theme.COLORS.NEUTRAL_700};

          &:hover {
            background-color: ${theme.COLORS.NEUTRAL_100};
          }
        `}

  &:focus {
    outline: none;
    background-color: ${({ theme, variant }) =>
      variant === 'danger'
        ? theme.COLORS.ERROR_MAIN
        : theme.COLORS.NEUTRAL_100};
    color: ${({ theme, variant }) =>
      variant === 'danger' ? theme.COLORS.NEUTRAL_50 : 'inherit'};
  }
`

export const ItemIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.SPACING.SM};
  flex-shrink: 0;
`

export const ItemLabel = styled.span`
  flex: 1;
  white-space: nowrap;
`
