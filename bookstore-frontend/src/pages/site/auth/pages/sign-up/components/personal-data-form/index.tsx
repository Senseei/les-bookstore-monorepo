import { Input } from '@/components'

import type { FormProps } from '../../types'
import * as S from './styles'

export const PersonalDataForm = ({
  register,
  errors,
  formValidation,
}: FormProps) => {
  return (
    <S.Section>
      <S.SectionTitle>Dados Pessoais</S.SectionTitle>
      <S.Grid>
        <Input
          label="Nome Completo"
          {...register('name', formValidation.name)}
          error={!!errors.name}
          errorMessage={errors.name?.message}
          placeholder="Seu nome completo"
          required
        />

        <Input
          label="CPF"
          {...register('cpf', formValidation.cpf)}
          error={!!errors.cpf}
          errorMessage={errors.cpf?.message}
          placeholder="000.000.000-00"
          required
        />

        <Input
          label="Email"
          type="email"
          {...register('email', formValidation.email)}
          error={!!errors.email}
          errorMessage={errors.email?.message}
          placeholder="seu@email.com"
          required
        />

        <Input
          label="Telefone"
          {...register('phone', formValidation.phone)}
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
          placeholder="(11) 99999-9999"
          required
        />

        <Input
          label="Gênero"
          {...register('gender', formValidation.gender)}
          error={!!errors.gender}
          errorMessage={errors.gender?.message}
          placeholder="Masculino/Feminino/Outro"
          required
        />

        <Input
          label="Data de Nascimento"
          type="text"
          {...register('birthDate', formValidation.birthDate)}
          error={!!errors.birthDate}
          errorMessage={errors.birthDate?.message}
          placeholder="DD/MM/AAAA"
          required
        />

        <Input
          label="Senha"
          type="password"
          {...register('password', formValidation.password)}
          error={!!errors.password}
          errorMessage={errors.password?.message}
          placeholder="••••••••"
          required
        />

        <Input
          label="Confirmar Senha"
          type="password"
          {...register('confirmPassword', formValidation.confirmPassword)}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          placeholder="••••••••"
          required
        />
      </S.Grid>
    </S.Section>
  )
}
