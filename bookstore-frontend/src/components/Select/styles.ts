import styled from 'styled-components'

// Container for the entire select component
export const SelectContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

// Label for the select
export const SelectLabel = styled.label`
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  color: ${(props) => props.theme.COLORS.NEUTRAL_700};
  margin-bottom: ${(props) => props.theme.SPACING.XS};
`

// Wrapper that contains the select and arrow
export const SelectWrapper = styled.div<{
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  disabled?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.BORDER_RADIUS.MD};
  transition: all ${(props) => props.theme.TRANSITIONS.FAST};
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  border: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};

  &:focus-within {
    border-color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
    box-shadow: 0 0 0 2px ${(props) => props.theme.COLORS.PRIMARY_LIGHT}40;
  }

  /* Size variants */
  ${(props) => {
    const size = props.size || 'md'
    if (size === 'sm') {
      return `
        padding: ${props.theme.SPACING.XS} ${props.theme.SPACING.SM};
        font-size: ${props.theme.FONT_SIZE.XSMALL};
        min-height: 32px;
      `
    }
    if (size === 'lg') {
      return `
        padding: ${props.theme.SPACING.MD} ${props.theme.SPACING.LG};
        font-size: ${props.theme.FONT_SIZE.MEDIUM};
        min-height: 48px;
      `
    }
    // Default md size
    return `
      padding: ${props.theme.SPACING.SM} ${props.theme.SPACING.MD};
      font-size: ${props.theme.FONT_SIZE.SMALL};
      min-height: 40px;
    `
  }}

  /* Error state */
  ${(props) =>
    props.error &&
    `
      border-color: ${props.theme.COLORS.ERROR_MAIN} !important;
      box-shadow: 0 0 0 2px ${props.theme.COLORS.ERROR_LIGHT}40 !important;
    `}

  /* Disabled state */
  ${(props) =>
    props.disabled &&
    `
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${props.theme.COLORS.NEUTRAL_100};
    `}
`

// The actual select element
export const StyledSelect = styled.select`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  appearance: none;
  padding-right: ${(props) => props.theme.SPACING.MD};

  &:disabled {
    cursor: not-allowed;
  }

  option {
    background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
    color: ${(props) => props.theme.COLORS.NEUTRAL_800};
    padding: ${(props) => props.theme.SPACING.SM};
  }
`

// Arrow icon
export const SelectArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.COLORS.NEUTRAL_400};
  font-size: 12px;
  pointer-events: none;
  position: absolute;
  right: ${(props) => props.theme.SPACING.SM};
  top: 50%;
  transform: translateY(-50%);
`

// Helper text below the select
export const SelectHelperText = styled.div<{ error?: boolean }>`
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  color: ${(props) =>
    props.error
      ? props.theme.COLORS.ERROR_MAIN
      : props.theme.COLORS.NEUTRAL_500};
  margin-top: ${(props) => props.theme.SPACING.XS};
`
