import { PlusIcon, StyledButton } from './styles'

interface AddButtonProps {
  onClick: () => void
}

export const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <PlusIcon>+</PlusIcon>
      Adicionar Cliente
    </StyledButton>
  )
}
