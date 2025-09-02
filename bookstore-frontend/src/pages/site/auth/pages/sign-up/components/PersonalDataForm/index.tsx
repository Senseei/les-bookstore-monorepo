import { Input, Select } from '@/components'

import type { FormProps, Gender } from '../../types'
import * as S from './styles'

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
  { value: 'other', label: 'Outro' },
]

export const PersonalDataForm = ({ formData, errors, onChange }: FormProps) => {
  return (
    <S.Section>
      <S.SectionTitle>Dados Pessoais</S.SectionTitle>
      <S.Grid>
        <Input
          label="Nome Completo"
          value={formData.name}
          onChange={(value) => onChange('name', value)}
          error={!!errors.name}
          errorMessage={errors.name}
          placeholder="Seu nome completo"
          required
        />

        <Input
          label="CPF"
          value={formData.cpf}
          onChange={(value) => onChange('cpf', value)}
          error={!!errors.cpf}
          errorMessage={errors.cpf}
          placeholder="000.000.000-00"
          required
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => onChange('email', value)}
          error={!!errors.email}
          errorMessage={errors.email}
          placeholder="seu@email.com"
          required
        />

        <Input
          label="Telefone"
          value={formData.phone}
          onChange={(value) => onChange('phone', value)}
          error={!!errors.phone}
          errorMessage={errors.phone}
          placeholder="(11) 99999-9999"
          required
        />

        <Select
          label="Gênero"
          value={formData.gender}
          onChange={(value) => onChange('gender', value)}
          error={!!errors.gender}
          helperText={errors.gender}
          placeholder="Selecione"
          options={genderOptions}
        />

        <Input
          label="Data de Nascimento"
          type="text"
          value={formData.birthDate}
          onChange={(value) => onChange('birthDate', value)}
          error={!!errors.birthDate}
          errorMessage={errors.birthDate}
          placeholder="DD/MM/AAAA"
          required
        />

        <Input
          label="Senha"
          type="password"
          value={formData.password}
          onChange={(value) => onChange('password', value)}
          error={!!errors.password}
          errorMessage={errors.password}
          placeholder="••••••••"
          required
        />

        <Input
          label="Confirmar Senha"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => onChange('confirmPassword', value)}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          placeholder="••••••••"
          required
        />
      </S.Grid>
    </S.Section>
  )
}
