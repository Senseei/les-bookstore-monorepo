import React from 'react'

import * as S from './styles'

export interface InputProps {
  children?: React.ReactNode
  value?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outline'
  disabled?: boolean
  error?: boolean
  fullWidth?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Input = ({
  value = '',
  placeholder,
  type = 'text',
  size = 'md',
  variant = 'default',
  disabled = false,
  error = false,
  fullWidth = false,
  startIcon,
  endIcon,
  label,
  helperText,
  errorMessage,
  required = false,
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const handleChange = (e: { target: { value: string } }) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <S.InputContainer fullWidth={fullWidth}>
      {label && (
        <S.InputLabel required={required}>
          {label}
          {required && <S.RequiredAsterisk>*</S.RequiredAsterisk>}
        </S.InputLabel>
      )}

      <S.InputWrapper
        size={size}
        variant={variant}
        error={error}
        disabled={disabled}
      >
        {startIcon && <S.InputIcon position="start">{startIcon}</S.InputIcon>}

        <S.StyledInput
          value={value}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          hasStartIcon={!!startIcon}
          hasEndIcon={!!endIcon}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />

        {endIcon && <S.InputIcon position="end">{endIcon}</S.InputIcon>}
      </S.InputWrapper>

      {(helperText || errorMessage) && (
        <S.InputHelperText error={error}>
          {error ? errorMessage : helperText}
        </S.InputHelperText>
      )}
    </S.InputContainer>
  )
}
