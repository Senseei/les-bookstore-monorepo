import { Button } from '@/components'

interface AddButtonProps {
  onClick: () => void
}

export const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <Button variant="primary" size="md" onClick={onClick}>
      + Adicionar Cliente
    </Button>
  )
}
