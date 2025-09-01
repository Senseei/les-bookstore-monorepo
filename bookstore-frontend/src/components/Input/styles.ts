import styled, { css } from 'styled-components'

// Container for the entire input component
export const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

// Label for the input
export const InputLabel = styled.label<{ required?: boolean }>`
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  color: ${(props) => props.theme.COLORS.NEUTRAL_700};
  margin-bottom: ${(props) => props.theme.SPACING.XS};
`

export const RequiredAsterisk = styled.span`
  color: ${(props) => props.theme.COLORS.ERROR_MAIN};
  margin-left: 2px;
`

// Wrapper that contains the input and icons
export const InputWrapper = styled.div<{
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outline'
  error?: boolean
  disabled?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.BORDER_RADIUS.MD};
  transition: all ${(props) => props.theme.TRANSITIONS.FAST};
  width: 100%;

  /* Size variants - inline to avoid plugin issues */
  ${(props) => {
    const size = props.size || 'md'
    if (size === 'sm') {
      return css`
        padding: ${props.theme.SPACING.XS} ${props.theme.SPACING.SM};
        font-size: ${props.theme.FONT_SIZE.XSMALL};
        min-height: 32px;
      `
    }
    if (size === 'lg') {
      return css`
        padding: ${props.theme.SPACING.MD} ${props.theme.SPACING.LG};
        font-size: ${props.theme.FONT_SIZE.MEDIUM};
        min-height: 48px;
      `
    }
    // Default md size
    return css`
      padding: ${props.theme.SPACING.SM} ${props.theme.SPACING.MD};
      font-size: ${props.theme.FONT_SIZE.SMALL};
      min-height: 40px;
    `
  }}

  /* Style variants - inline to avoid plugin issues */
  ${(props) => {
    const variant = props.variant || 'default'
    if (variant === 'filled') {
      return css`
        background-color: ${props.theme.COLORS.NEUTRAL_100};
        border: 1px solid transparent;

        &:focus-within {
          border-color: ${props.theme.COLORS.PRIMARY_MAIN};
          background-color: ${props.theme.COLORS.NEUTRAL_50};
          box-shadow: 0 0 0 2px ${props.theme.COLORS.PRIMARY_LIGHT}40;
        }
      `
    }
    if (variant === 'outline') {
      return css`
        background-color: transparent;
        border: 2px solid ${props.theme.COLORS.NEUTRAL_300};

        &:focus-within {
          border-color: ${props.theme.COLORS.PRIMARY_MAIN};
          box-shadow: 0 0 0 1px ${props.theme.COLORS.PRIMARY_LIGHT}40;
        }
      `
    }
    // Default variant
    return css`
      background-color: ${props.theme.COLORS.NEUTRAL_50};
      border: 1px solid ${props.theme.COLORS.NEUTRAL_200};

      &:focus-within {
        border-color: ${props.theme.COLORS.PRIMARY_MAIN};
        box-shadow: 0 0 0 2px ${props.theme.COLORS.PRIMARY_LIGHT}40;
      }
    `
  }}

  /* Error state - simplified */
  ${(props) =>
    props.error &&
    `
      border-color: ${props.theme.COLORS.ERROR_MAIN} !important;
      box-shadow: 0 0 0 2px ${props.theme.COLORS.ERROR_LIGHT}40 !important;
    `}

  /* Disabled state - simplified */
  ${(props) =>
    props.disabled &&
    `
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${props.theme.COLORS.NEUTRAL_100};
    `}
`

// The actual input element
export const StyledInput = styled.input<{
  hasStartIcon?: boolean
  hasEndIcon?: boolean
}>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  font-family: inherit;

  &::placeholder {
    color: ${(props) => props.theme.COLORS.NEUTRAL_400};
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* Adjust padding for icons - inline logic */
  ${(props) =>
    props.hasStartIcon &&
    `
      padding-left: 0;
      margin-left: ${props.theme.SPACING.XS};
    `}

  ${(props) =>
    props.hasEndIcon &&
    `
      padding-right: 0;
      margin-right: ${props.theme.SPACING.XS};
    `}
`

// Icon container
export const InputIcon = styled.div<{ position: 'start' | 'end' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.COLORS.NEUTRAL_400};
  font-size: 16px;

  /* Position-based padding - inline logic */
  ${(props) =>
    props.position === 'start' &&
    `
      padding-left: ${props.theme.SPACING.SM};
    `}

  ${(props) =>
    props.position === 'end' &&
    `
      padding-right: ${props.theme.SPACING.SM};
    `}
`

// Helper text below the input
export const InputHelperText = styled.div<{ error?: boolean }>`
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  color: ${(props) =>
    props.error
      ? props.theme.COLORS.ERROR_MAIN
      : props.theme.COLORS.NEUTRAL_500};
  margin-top: ${(props) => props.theme.SPACING.XS};
`
