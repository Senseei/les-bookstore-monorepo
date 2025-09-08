import { Controller } from 'react-hook-form'

import { Input, Select } from '@/components'
import {
  residenceTypeOptions,
  stateOptions,
} from '@/utils/constants'
import {
  addressValidationRules,
  residenceTypeValidationRules,
  stateValidationRules,
  zipCodeValidationRules,
} from '@/utils/validation-rules'

import type { FormProps } from '../../types'
import * as S from './styles'

export const AddressForm = ({
  register,
  errors,
  registerZipCode,
  control,
}: FormProps) => {
  return (
    <S.Section>
      <S.SectionTitle>Endereço Principal</S.SectionTitle>
      <S.Grid>
        <Input
          label="Nome do Endereço"
          {...register(
            'address.identifier',
            addressValidationRules.addressIdentifier,
          )}
          error={!!errors.address?.identifier}
          errorMessage={errors.address?.identifier?.message}
          placeholder="Ex: Casa Principal"
        />

        <Controller
          name="address.residenceType"
          control={control}
          rules={residenceTypeValidationRules}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Tipo de Residência"
              value={value}
              onChange={onChange}
              error={!!errors.address?.residenceType}
              helperText={errors.address?.residenceType?.message}
              placeholder="Selecione"
              options={residenceTypeOptions}
            />
          )}
        />

        <Input
          label="CEP"
          {...registerZipCode?.(zipCodeValidationRules)}
          error={!!errors.address?.zipCode}
          errorMessage={errors.address?.zipCode?.message}
          placeholder="00000-000"
          required
        />

        <Input
          label="Logradouro"
          {...register('address.street', addressValidationRules.street)}
          error={!!errors.address?.street}
          errorMessage={errors.address?.street?.message}
          placeholder="Rua, Avenida, etc."
          required
        />

        <Input
          label="Número"
          {...register('address.number', addressValidationRules.number)}
          error={!!errors.address?.number}
          errorMessage={errors.address?.number?.message}
          placeholder="123"
          required
        />

        <Input
          label="Complemento"
          {...register('address.complement', addressValidationRules.complement)}
          error={!!errors.address?.complement}
          errorMessage={errors.address?.complement?.message}
          placeholder="Apto, Bloco, etc. (opcional)"
        />

        <Input
          label="Bairro"
          {...register(
            'address.neighborhood',
            addressValidationRules.neighborhood,
          )}
          error={!!errors.address?.neighborhood}
          errorMessage={errors.address?.neighborhood?.message}
          placeholder="Nome do bairro"
          required
        />

        <Input
          label="Cidade"
          {...register('address.city', addressValidationRules.city)}
          error={!!errors.address?.city}
          errorMessage={errors.address?.city?.message}
          placeholder="Nome da cidade"
          required
        />

        <Controller
          name="address.state"
          control={control}
          rules={stateValidationRules}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Estado"
              value={value}
              onChange={onChange}
              error={!!errors.address?.state}
              helperText={errors.address?.state?.message}
              placeholder="Selecione o estado"
              options={stateOptions}
            />
          )}
        />
      </S.Grid>
    </S.Section>
  )
}
