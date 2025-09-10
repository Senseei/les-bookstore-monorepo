import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Input, Select } from '@/components'
import {
  addressPurposeOptions,
  residenceTypeOptions,
  stateOptions,
} from '@/utils/constants'
import {
  convertFromMaskedFormat,
  convertToMaskedFormat,
  formatZipCode,
} from '@/utils/input-masks'
import {
  addressValidationRules,
  zipCodeValidationRules,
} from '@/utils/validation-rules'

import type { Address } from '../../types'
import * as S from './styles'

interface AddressFormProps {
  address?: Address
  onSave: (address: Omit<Address, 'id'>) => void
  onCancel: () => void
  loading?: boolean
}

interface AddressFormData {
  type: string
  purpose: string
  addressName: string
  postalCode: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
}

type InputChangeEvent = React.ChangeEvent<{ value: string }>

export const AddressForm = ({
  address,
  onSave,
  onCancel,
  loading = false,
}: AddressFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddressFormData>({
    defaultValues: {
      type: address?.type || 'house',
      purpose: address?.purpose || 'both',
      addressName: address?.addressName || '',
      postalCode: convertToMaskedFormat.zipCode(address?.postalCode || ''),
      street: address?.street || '',
      number: address?.number || '',
      complement: address?.complement || '',
      district: address?.district || '',
      city: address?.city || '',
      state: address?.state || '',
    },
  })

  const typeValue = watch('type')
  const purposeValue = watch('purpose')
  const stateValue = watch('state')

  const onSubmit = (data: AddressFormData) => {
    // Convert masked data back to backend format
    const convertedData = {
      ...data,
      postalCode: convertFromMaskedFormat.zipCode(data.postalCode),
    }
    onSave(convertedData as Omit<Address, 'id'>)
  }

  // Helper function for ZIP code input
  const registerZipCode = (validationRules: object) => ({
    ...register('postalCode', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatZipCode(e.target.value)
      setValue('postalCode', maskedValue, { shouldValidate: true })
    },
  })

  return (
    <S.Container>
      <S.FormTitle>
        {address ? 'Editar Endereço' : 'Adicionar Endereço'}
      </S.FormTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormGrid>
          <Input
            label="Nome do Endereço"
            {...register(
              'addressName',
              addressValidationRules.addressIdentifier,
            )}
            placeholder="Ex: Casa, Trabalho, Casa da Mãe"
            error={!!errors.addressName}
            errorMessage={errors.addressName?.message}
          />

          <Select
            label="Tipo de Endereço"
            value={typeValue}
            onChange={(value) => setValue('type', value)}
            options={residenceTypeOptions}
            error={!!errors.type}
          />

          <Select
            label="Finalidade do Endereço"
            value={purposeValue}
            onChange={(value) => setValue('purpose', value)}
            options={addressPurposeOptions}
            error={!!errors.purpose}
          />

          <Input
            label="CEP"
            {...registerZipCode(zipCodeValidationRules)}
            placeholder="00000-000"
            error={!!errors.postalCode}
            errorMessage={errors.postalCode?.message}
          />

          <Input
            label="Logradouro"
            {...register('street', addressValidationRules.street)}
            placeholder="Nome da rua/avenida"
            error={!!errors.street}
            errorMessage={errors.street?.message}
          />

          <Input
            label="Número"
            {...register('number', addressValidationRules.number)}
            placeholder="123"
            error={!!errors.number}
            errorMessage={errors.number?.message}
          />

          <Input
            label="Complemento"
            {...register('complement', addressValidationRules.complement)}
            placeholder="Apto 45, Bloco B, Casa 2"
            error={!!errors.complement}
            errorMessage={errors.complement?.message}
          />

          <Input
            label="Bairro"
            {...register('district', addressValidationRules.neighborhood)}
            error={!!errors.district}
            errorMessage={errors.district?.message}
          />

          <Input
            label="Cidade"
            {...register('city', addressValidationRules.city)}
            error={!!errors.city}
            errorMessage={errors.city?.message}
          />

          <Select
            label="Estado"
            value={stateValue}
            onChange={(value) => setValue('state', value)}
            placeholder="Selecione o estado"
            options={stateOptions}
            error={!!errors.state}
          />
        </S.FormGrid>

        <S.FormActions>
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            {address ? 'Atualizar' : 'Adicionar'} Endereço
          </Button>
        </S.FormActions>
      </form>
    </S.Container>
  )
}
