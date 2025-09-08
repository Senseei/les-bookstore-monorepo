import { useState } from 'react'

import { Button } from '@/components'

import * as S from './styles'

interface InactivateAccountFormProps {
  onInactivate: () => Promise<void>
  loading?: boolean
}

export const InactivateAccountForm = ({
  onInactivate,
  loading = false,
}: InactivateAccountFormProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleConfirm = async () => {
    await onInactivate()
    setShowConfirmation(false)
  }

  if (showConfirmation) {
    return (
      <S.Container>
        <S.FormTitle>Confirmar Inativação da Conta</S.FormTitle>
        <S.WarningText>
          ⚠️ <strong>Atenção:</strong> Esta ação irá inativar permanentemente
          sua conta. Você não poderá mais acessar o sistema com essas
          credenciais.
        </S.WarningText>
        <S.WarningText>Tem certeza de que deseja prosseguir?</S.WarningText>

        <S.FormActions>
          <Button
            variant="ghost"
            onClick={() => setShowConfirmation(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirm} loading={loading}>
            Sim, Inativar Conta
          </Button>
        </S.FormActions>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.FormTitle>Zona de Perigo</S.FormTitle>
      <S.InfoText>
        Se você não deseja mais utilizar nossa plataforma, pode inativar sua
        conta. Esta ação pode ser revertida entrando em contato com nosso
        suporte.
      </S.InfoText>

      <S.FormActions>
        <Button
          variant="danger"
          onClick={() => setShowConfirmation(true)}
          disabled={loading}
        >
          Inativar Minha Conta
        </Button>
      </S.FormActions>
    </S.Container>
  )
}
