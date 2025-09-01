import { Link } from 'react-router'
import styled, { css } from 'styled-components'

interface StyledNavigationButtonProps {
  variant: 'primary' | 'secondary'
}

const primaryStyles = css`
  background-color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
  color: ${(props) => props.theme.COLORS.NEUTRAL_50};

  &:hover {
    background-color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
  }
`

const secondaryStyles = css`
  background-color: transparent;
  color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
  border: 1px solid ${(props) => props.theme.COLORS.PRIMARY_MAIN};

  &:hover {
    background-color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
    color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  }
`

export const StyledNavigationButton = styled(Link)<StyledNavigationButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => `${props.theme.SPACING.SM} ${props.theme.SPACING.MD}`};
  text-decoration: none;
  border-radius: ${(props) => props.theme.BORDER_RADIUS.MD};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  transition: all ${(props) => props.theme.TRANSITIONS.FAST};
  border: 1px solid transparent;

  ${(props) => props.variant === 'primary' && primaryStyles}
  ${(props) => props.variant === 'secondary' && secondaryStyles}
`
