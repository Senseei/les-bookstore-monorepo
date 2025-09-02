import * as S from './styles'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  label?: string
  helperText?: string
  error?: boolean
}

export const Select = ({
  options,
  value,
  placeholder = 'Select an option...',
  onChange,
  disabled = false,
  size = 'md',
  fullWidth = false,
  label,
  helperText,
  error = false,
}: SelectProps) => {
  const handleChange = (event: { target: { value: string } }) => {
    onChange?.(event.target.value)
  }

  return (
    <S.SelectContainer fullWidth={fullWidth}>
      {label && <S.SelectLabel>{label}</S.SelectLabel>}

      <S.SelectWrapper size={size} error={error} disabled={disabled}>
        <S.StyledSelect
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.StyledSelect>
        <S.SelectArrow>▼</S.SelectArrow>
      </S.SelectWrapper>

      {helperText && (
        <S.SelectHelperText error={error}>{helperText}</S.SelectHelperText>
      )}
    </S.SelectContainer>
  )
}
