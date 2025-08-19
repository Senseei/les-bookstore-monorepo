import { StyledButton } from './styles'

interface TabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return (
    <StyledButton $isActive={isActive} onClick={onClick}>
      {label}
    </StyledButton>
  )
}
