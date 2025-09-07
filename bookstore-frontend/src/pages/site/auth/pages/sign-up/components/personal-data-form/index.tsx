import { Controller } from 'react-hook-form'

import { Input, Select } from '@/components'
import { genderOptions } from '@/utils/constants'
import {
  birthDateValidationRules,
  confirmPasswordValidationRules,
  cpfValidationRules,
  emailValidationRules,
  genderValidationRules,
  passwordValidationRules,
  personNameValidationRules,
  phoneValidationRules,
} from '@/utils/validation-rules'

import type { FormProps } from '../../types'
import * as S from './styles'

export const PersonalDataForm = ({
  register,
  errors,
  registerCPF,
  registerPhone,
  registerBirthDate,
  control,
  passwordValue = '',
}: FormProps) => {
  return (
    <S.Section>
      <S.SectionTitle>Dados Pessoais</S.SectionTitle>
      <S.Grid>
        <Input
          label="Nome Completo"
          {...register('name', personNameValidationRules)}
          error={!!errors.name}
          errorMessage={errors.name?.message}
          placeholder="Seu nome completo"
          required
        />

        <Input
          label="CPF"
          {...registerCPF?.(cpfValidationRules)}
          error={!!errors.cpf}
          errorMessage={errors.cpf?.message}
          placeholder="000.000.000-00"
          required
        />

        <Input
          label="Email"
          type="email"
          {...register('email', emailValidationRules)}
          error={!!errors.email}
          errorMessage={errors.email?.message}
          placeholder="seu@email.com"
          required
        />

        <Input
          label="Telefone"
          {...registerPhone?.(phoneValidationRules)}
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
          placeholder="(11) 99999-9999"
          required
        />

        <Controller
          name="gender"
          control={control}
          rules={genderValidationRules}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Gênero"
              value={value}
              onChange={onChange}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              placeholder="Selecione"
              options={genderOptions}
            />
          )}
        />

        <Input
          label="Data de Nascimento"
          {...registerBirthDate?.(birthDateValidationRules)}
          error={!!errors.birthDate}
          errorMessage={errors.birthDate?.message}
          placeholder="DD/MM/AAAA"
          required
        />

        <Input
          label="Senha"
          type="password"
          {...register('password', passwordValidationRules)}
          error={!!errors.password}
          errorMessage={errors.password?.message}
          placeholder="••••••••"
          required
        />

        <Input
          label="Confirmar Senha"
          type="password"
          {...register(
            'confirmPassword',
            confirmPasswordValidationRules(passwordValue),
          )}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          placeholder="••••••••"
          required
        />
      </S.Grid>
    </S.Section>
  )
}
