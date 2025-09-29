import * as S from './styles'

export type { ButtonProps } from './styles'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  'data-testid': dataTestId,
  ...props
}: S.ButtonProps) => {
  return (
    <S.StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      data-testid={dataTestId}
      {...props}
    >
      {startIcon && <span>{startIcon}</span>}
      {loading ? 'Carregando...' : children}
      {endIcon && <span>{endIcon}</span>}
    </S.StyledButton>
  )
}
