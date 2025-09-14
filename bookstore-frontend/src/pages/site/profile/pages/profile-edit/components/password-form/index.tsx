import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, Form, FormField, FormSection } from '@/components'
import {
  type PasswordChangeFormData,
  passwordChangeSchema,
} from '@/schemas/profile-schemas'

import type { PasswordChangeData } from '../../types'
import * as S from './styles'

interface PasswordFormProps {
  onSave: (data: PasswordChangeData) => void
  onCancel: () => void
  loading?: boolean
}

export const PasswordForm = ({
  onSave,
  onCancel,
  loading = false,
}: PasswordFormProps) => {
  const form = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: PasswordChangeFormData) => {
    onSave(data)
  }

  return (
    <S.Container>
      <S.FormTitle>Alterar Senha</S.FormTitle>

      <Form form={form} onSubmit={onSubmit}>
        <FormSection>
          <S.FormField>
            <FormField
              form={form}
              name="currentPassword"
              type="password"
              label="Senha Atual"
              placeholder="Digite sua senha atual"
            />
          </S.FormField>

          <S.FormField>
            <FormField
              form={form}
              name="newPassword"
              type="password"
              label="Nova Senha"
              placeholder="Digite sua nova senha"
            />
          </S.FormField>

          <S.FormField>
            <FormField
              form={form}
              name="confirmPassword"
              type="password"
              label="Confirmar Nova Senha"
              placeholder="Confirme sua nova senha"
            />
          </S.FormField>
        </FormSection>

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
      </Form>
    </S.Container>
  )
}
