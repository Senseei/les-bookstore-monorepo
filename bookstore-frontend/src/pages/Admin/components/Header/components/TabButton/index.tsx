import * as S from './styles'

interface TabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return (
    <S.StyledButton $isActive={isActive} onClick={onClick}>
      {label}
    </S.StyledButton>
  )
}
