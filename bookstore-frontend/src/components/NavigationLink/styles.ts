import { Link } from 'react-router'
import styled, { css } from 'styled-components'

interface StyledNavigationLinkProps {
  variant: 'default' | 'primary' | 'muted'
  underline: boolean
}

const defaultStyles = css`
  color: ${(props) => props.theme.COLORS.NEUTRAL_700};

  &:hover {
    color: ${(props) => props.theme.COLORS.NEUTRAL_900};
  }
`

const primaryStyles = css`
  color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};

  &:hover {
    color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
  }
`

const mutedStyles = css`
  color: ${(props) => props.theme.COLORS.NEUTRAL_500};

  &:hover {
    color: ${(props) => props.theme.COLORS.NEUTRAL_700};
  }
`

export const StyledNavigationLink = styled(Link)<StyledNavigationLinkProps>`
  display: inline;
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.REGULAR};
  transition: color ${(props) => props.theme.TRANSITIONS.NORMAL};
  cursor: pointer;

  ${(props) => props.variant === 'default' && defaultStyles}
  ${(props) => props.variant === 'primary' && primaryStyles}
  ${(props) => props.variant === 'muted' && mutedStyles}

  &:focus {
    outline: 2px solid ${(props) => props.theme.COLORS.PRIMARY_MAIN};
    outline-offset: 2px;
  }
`
