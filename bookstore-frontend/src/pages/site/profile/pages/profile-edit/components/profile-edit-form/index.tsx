import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Input, Select } from '@/components'
import { formatCPF, formatDate, formatPhone } from '@/utils/input-masks'
import {
  birthDateValidationRules,
  cpfValidationRules,
  emailValidationRules,
  personNameValidationRules,
  phoneValidationRules,
} from '@/utils/validation-rules'

import type { Customer } from '../../types'
import * as S from './styles'

interface ProfileEditFormProps {
  customer: Customer
  onSave: (data: Partial<Customer>) => void
  onCancel: () => void
  loading?: boolean
}

interface ProfileFormData {
  name: string
  email: string
  phone: string
  cpf: string
  birthDate: string
  gender: 'Masculino' | 'Feminino' | 'Outro'
}

type InputChangeEvent = React.ChangeEvent<{ value: string }>

export const ProfileEditForm = ({
  customer,
  onSave,
  onCancel,
  loading = false,
}: ProfileEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      cpf: customer.cpf || '',
      birthDate: customer.birthDate || '',
      gender: customer.gender || 'Masculino',
    },
  })

  const genderValue = watch('gender')

  const onSubmit = (data: ProfileFormData) => {
    onSave(data)
  }

  // Helper functions for masked inputs
  const registerCPF = (validationRules: object) => ({
    ...register('cpf', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatCPF(e.target.value)
      setValue('cpf', maskedValue, { shouldValidate: true })
    },
  })

  const registerPhone = (validationRules: object) => ({
    ...register('phone', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatPhone(e.target.value)
      setValue('phone', maskedValue, { shouldValidate: true })
    },
  })

  const registerBirthDate = (validationRules: object) => ({
    ...register('birthDate', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatDate(e.target.value)
      setValue('birthDate', maskedValue, { shouldValidate: true })
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.FormGrid>
        <Input
          label="Nome Completo"
          {...register('name', personNameValidationRules)}
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          {...register('email', emailValidationRules)}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <Input
          label="CPF"
          {...registerCPF(cpfValidationRules)}
          error={!!errors.cpf}
          errorMessage={errors.cpf?.message}
        />

        <Input
          label="Data de Nascimento"
          {...registerBirthDate(birthDateValidationRules)}
          placeholder="DD/MM/AAAA"
          error={!!errors.birthDate}
          errorMessage={errors.birthDate?.message}
        />

        <Input
          label="Telefone"
          {...registerPhone(phoneValidationRules)}
          placeholder="(11) 99999-9999"
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
        />

        <Select
          label="Gênero"
          value={genderValue}
          onChange={(value) =>
            setValue('gender', value as 'Masculino' | 'Feminino' | 'Outro')
          }
          error={!!errors.gender}
          options={[
            { value: 'Masculino', label: 'Masculino' },
            { value: 'Feminino', label: 'Feminino' },
            { value: 'Outro', label: 'Outro' },
          ]}
        />
      </S.FormGrid>

      <S.FormActions>
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          Salvar Alterações
        </Button>
      </S.FormActions>
    </form>
  )
}
