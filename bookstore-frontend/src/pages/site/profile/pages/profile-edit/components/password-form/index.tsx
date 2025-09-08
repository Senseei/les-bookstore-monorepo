import { type FormEvent, useState } from 'react'

import { Button, Input } from '@/components'

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
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const validatePassword = (password: string): string[] => {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Pelo menos 8 caracteres')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Pelo menos uma letra maiúscula')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Pelo menos uma letra minúscula')
    }
    if (!/\d/.test(password)) {
      errors.push('Pelo menos um número')
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('Pelo menos um caractere especial')
    }

    return errors
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    // Validate current password
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Senha atual é obrigatória'
    }

    // Validate new password
    if (!formData.newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória'
    } else {
      const passwordErrors = validatePassword(formData.newPassword)
      if (passwordErrors.length > 0) {
        newErrors.newPassword = passwordErrors.join(', ')
      }
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    // Check if new password is different from current
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword = 'A nova senha deve ser diferente da atual'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSave(formData)
    }
  }

  const passwordStrength = formData.newPassword
    ? validatePassword(formData.newPassword)
    : []
  const strengthPercentage = Math.max(
    0,
    ((5 - passwordStrength.length) / 5) * 100,
  )

  return (
    <S.Container>
      <S.FormTitle>Alterar Senha</S.FormTitle>

      <form onSubmit={handleSubmit}>
        <S.FormField>
          <Input
            type="password"
            label="Senha Atual"
            value={formData.currentPassword}
            onChange={(e) =>
              handleInputChange('currentPassword', e.target.value)
            }
            error={!!errors.currentPassword}
            required
            placeholder="Digite sua senha atual"
          />
          {errors.currentPassword && (
            <S.ErrorMessage>{errors.currentPassword}</S.ErrorMessage>
          )}
        </S.FormField>

        <S.FormField>
          <Input
            type="password"
            label="Nova Senha"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            error={!!errors.newPassword}
            required
            placeholder="Digite sua nova senha"
          />
          {errors.newPassword && (
            <S.ErrorMessage>{errors.newPassword}</S.ErrorMessage>
          )}
          {formData.newPassword && (
            <S.PasswordStrength>
              <S.StrengthBar>
                <S.StrengthFill $percentage={strengthPercentage} />
              </S.StrengthBar>
              <S.StrengthText>
                Força da senha:{' '}
                {strengthPercentage === 100
                  ? 'Muito forte'
                  : strengthPercentage >= 80
                    ? 'Forte'
                    : strengthPercentage >= 60
                      ? 'Média'
                      : strengthPercentage >= 40
                        ? 'Fraca'
                        : 'Muito fraca'}
              </S.StrengthText>
              {passwordStrength.length > 0 && (
                <S.RequirementsList>
                  <S.RequirementsTitle>
                    Requisitos faltantes:
                  </S.RequirementsTitle>
                  {passwordStrength.map((requirement, index) => (
                    <S.RequirementItem key={index}>
                      • {requirement}
                    </S.RequirementItem>
                  ))}
                </S.RequirementsList>
              )}
            </S.PasswordStrength>
          )}
        </S.FormField>

        <S.FormField>
          <Input
            type="password"
            label="Confirmar Nova Senha"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            error={!!errors.confirmPassword}
            required
            placeholder="Confirme sua nova senha"
          />
          {errors.confirmPassword && (
            <S.ErrorMessage>{errors.confirmPassword}</S.ErrorMessage>
          )}
        </S.FormField>

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
