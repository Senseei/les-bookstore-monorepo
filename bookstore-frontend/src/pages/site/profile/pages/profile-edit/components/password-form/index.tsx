import { useForm } from 'react-hook-form'

import { Button, Input } from '@/components'
import {
  confirmPasswordValidationRules,
  passwordValidationRules,
} from '@/utils/validation-rules'

import type { PasswordChangeData } from '../../types'
import * as S from './styles'

interface PasswordFormProps {
  onSave: (data: PasswordChangeData) => void
  onCancel: () => void
  loading?: boolean
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const PasswordForm = ({
  onSave,
  onCancel,
  loading = false,
}: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const newPasswordValue = watch('newPassword')

  const onSubmit = (data: PasswordFormData) => {
    onSave(data)
  }

  // Validation rule for current password
  const currentPasswordRules = {
    required: 'Senha atual é obrigatória',
  }

  return (
    <S.Container>
      <S.FormTitle>Alterar Senha</S.FormTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormField>
          <Input
            label="Senha Atual"
            type="password"
            {...register('currentPassword', currentPasswordRules)}
            error={!!errors.currentPassword}
            errorMessage={errors.currentPassword?.message}
          />
        </S.FormField>

        <S.FormField>
          <Input
            label="Nova Senha"
            type="password"
            {...register('newPassword', passwordValidationRules)}
            error={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
          />
        </S.FormField>

        <S.FormField>
          <Input
            label="Confirmar Nova Senha"
            type="password"
            {...register(
              'confirmPassword',
              confirmPasswordValidationRules(newPasswordValue),
            )}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
        </S.FormField>

        <S.RequirementsList>
          <S.RequirementsTitle>Sua nova senha deve conter:</S.RequirementsTitle>
          <S.RequirementItem>Pelo menos 8 caracteres</S.RequirementItem>
          <S.RequirementItem>
            Pelo menos uma letra maiúscula (A-Z)
          </S.RequirementItem>
          <S.RequirementItem>
            Pelo menos uma letra minúscula (a-z)
          </S.RequirementItem>
          <S.RequirementItem>Pelo menos um número (0-9)</S.RequirementItem>
          <S.RequirementItem>
            Pelo menos um caractere especial (!@#$%^&*)
          </S.RequirementItem>
        </S.RequirementsList>

        <S.FormActions>
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            Alterar Senha
          </Button>
        </S.FormActions>
      </form>
    </S.Container>
  )
}
