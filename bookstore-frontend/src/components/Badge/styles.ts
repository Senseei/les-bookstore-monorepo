import styled from 'styled-components'

export interface BadgeStyleProps {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const StyledBadge = styled.span<BadgeStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.BORDER_RADIUS.XXL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  white-space: nowrap;
  transition: all ${(props) => props.theme.TRANSITIONS.FAST};

  /* Size variants */
  ${(props) => {
    const size = props.size || 'md'
    if (size === 'sm') {
      return `
        font-size: ${props.theme.FONT_SIZE.XSMALL};
        padding: 2px ${props.theme.SPACING.XS};
      `
    }
    if (size === 'lg') {
      return `
        font-size: ${props.theme.FONT_SIZE.SMALL};
        padding: ${props.theme.SPACING.SM} ${props.theme.SPACING.MD};
      `
    }
    // Default md size
    return `
      font-size: ${props.theme.FONT_SIZE.XSMALL};
      padding: ${props.theme.SPACING.XS} ${props.theme.SPACING.SM};
    `
  }}

  /* Color variants */
  ${(props) => {
    const variant = props.variant || 'default'
    if (variant === 'success') {
      return `
        background-color: ${props.theme.COLORS.SUCCESS_LIGHT}40;
        color: ${props.theme.COLORS.SUCCESS_DARK};
        border: 1px solid ${props.theme.COLORS.SUCCESS_MAIN};
      `
    }
    if (variant === 'warning') {
      return `
        background-color: ${props.theme.COLORS.WARNING_LIGHT}40;
        color: ${props.theme.COLORS.WARNING_DARK};
        border: 1px solid ${props.theme.COLORS.WARNING_MAIN};
      `
    }
    if (variant === 'danger') {
      return `
        background-color: ${props.theme.COLORS.ERROR_LIGHT}40;
        color: ${props.theme.COLORS.ERROR_DARK};
        border: 1px solid ${props.theme.COLORS.ERROR_MAIN};
      `
    }
    if (variant === 'secondary') {
      return `
        background-color: ${props.theme.COLORS.NEUTRAL_100};
        color: ${props.theme.COLORS.NEUTRAL_600};
        border: 1px solid ${props.theme.COLORS.NEUTRAL_200};
      `
    }
    // Default variant
    return `
      background-color: ${props.theme.COLORS.PRIMARY_LIGHT}40;
      color: ${props.theme.COLORS.PRIMARY_DARK};
      border: 1px solid ${props.theme.COLORS.PRIMARY_MAIN};
    `
  }}
`
