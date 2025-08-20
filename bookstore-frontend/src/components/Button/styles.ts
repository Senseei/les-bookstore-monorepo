import React from 'react'
import styled, { css } from 'styled-components'

export interface ButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

// Button size variants
const sizeVariants = {
  sm: css`
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 4px;
  `,
  md: css`
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 6px;
  `,
  lg: css`
    padding: 16px 24px;
    font-size: 16px;
    border-radius: 8px;
  `,
}

// Button color variants
const colorVariants = {
  primary: css`
    background-color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
    color: ${(props) => props.theme.COLORS.NEUTRAL_50};
    border: 1px solid ${(props) => props.theme.COLORS.PRIMARY_MAIN};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
      border-color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
    }

    &:active:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.PRIMARY_DARKER};
      border-color: ${(props) => props.theme.COLORS.PRIMARY_DARKER};
    }
  `,
  secondary: css`
    background-color: ${(props) => props.theme.COLORS.SECONDARY_MAIN};
    color: ${(props) => props.theme.COLORS.NEUTRAL_50};
    border: 1px solid ${(props) => props.theme.COLORS.SECONDARY_MAIN};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.SECONDARY_DARK};
      border-color: ${(props) => props.theme.COLORS.SECONDARY_DARK};
    }

    &:active:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.SECONDARY_DARKER};
      border-color: ${(props) => props.theme.COLORS.SECONDARY_DARKER};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
    border: 1px solid ${(props) => props.theme.COLORS.PRIMARY_MAIN};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
      color: ${(props) => props.theme.COLORS.NEUTRAL_50};
    }

    &:active:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
      border-color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${(props) => props.theme.COLORS.NEUTRAL_700};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.NEUTRAL_100};
    }

    &:active:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.NEUTRAL_200};
    }
  `,
  danger: css`
    background-color: ${(props) => props.theme.COLORS.ERROR_MAIN};
    color: ${(props) => props.theme.COLORS.NEUTRAL_50};
    border: 1px solid ${(props) => props.theme.COLORS.ERROR_MAIN};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.ERROR_DARK};
      border-color: ${(props) => props.theme.COLORS.ERROR_DARK};
    }

    &:active:not(:disabled) {
      background-color: ${(props) => props.theme.COLORS.ERROR_DARKER};
      border-color: ${(props) => props.theme.COLORS.ERROR_DARKER};
    }
  `,
}

export const StyledButton = styled.button<
  Pick<ButtonProps, 'variant' | 'size' | 'fullWidth' | 'loading'>
>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: inherit;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;

  /* Apply size variant */
  ${(props) => sizeVariants[props.size || 'md']}

  /* Apply color variant */
  ${(props) => colorVariants[props.variant || 'primary']}

  /* Full width */
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Loading state */
  ${(props) =>
    props.loading &&
    css`
      cursor: wait;
      opacity: 0.8;
    `}

  /* Focus styles */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.COLORS.PRIMARY_LIGHT}40;
  }
`
