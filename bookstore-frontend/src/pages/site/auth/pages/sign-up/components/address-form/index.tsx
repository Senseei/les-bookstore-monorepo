import { Controller } from 'react-hook-form'

import { Input, Select } from '@/components'
import { residenceTypeOptions, stateOptions } from '@/utils/constants'

import type { FormProps } from '../../types'
import * as S from './styles'

export const AddressForm = ({
  register,
  errors,
  formValidation,
  registerZipCode,
  control,
}: FormProps) => {
  return (
    <S.Section>
      <S.SectionTitle>Endereço Principal</S.SectionTitle>
      <S.Grid>
        <Input
          label="Nome do Endereço"
          {...register('addressIdentifier')}
          error={!!errors.addressIdentifier}
          errorMessage={errors.addressIdentifier?.message}
          placeholder="Ex: Casa Principal"
        />

        <Controller
          name="residenceType"
          control={control}
          rules={formValidation.residenceType}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Tipo de Residência"
              value={value}
              onChange={onChange}
              error={!!errors.residenceType}
              helperText={errors.residenceType?.message}
              placeholder="Selecione"
              options={residenceTypeOptions}
            />
          )}
        />

        <Input
          label="CEP"
          {...registerZipCode?.(formValidation.zipCode)}
          error={!!errors.zipCode}
          errorMessage={errors.zipCode?.message}
          placeholder="00000-000"
          required
        />

        <Input
          label="Logradouro"
          {...register('street', formValidation.street)}
          error={!!errors.street}
          errorMessage={errors.street?.message}
          placeholder="Rua, Avenida, etc."
          required
        />

        <Input
          label="Número"
          {...register('number', formValidation.number)}
          error={!!errors.number}
          errorMessage={errors.number?.message}
          placeholder="123"
          required
        />

        <Input
          label="Complemento"
          {...register('complement')}
          error={!!errors.complement}
          errorMessage={errors.complement?.message}
          placeholder="Apto, Bloco, etc. (opcional)"
        />

        <Input
          label="Bairro"
          {...register('neighborhood', formValidation.neighborhood)}
          error={!!errors.neighborhood}
          errorMessage={errors.neighborhood?.message}
          placeholder="Nome do bairro"
          required
        />

        <Input
          label="Cidade"
          {...register('city', formValidation.city)}
          error={!!errors.city}
          errorMessage={errors.city?.message}
          placeholder="Nome da cidade"
          required
        />

        <Controller
          name="state"
          control={control}
          rules={formValidation.state}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Estado"
              value={value}
              onChange={onChange}
              error={!!errors.state}
              helperText={errors.state?.message}
              placeholder="Selecione o estado"
              options={stateOptions}
            />
          )}
        />

        <S.FullWidthWrapper>
          <Input
            label="Observações"
            {...register('observations')}
            error={!!errors.observations}
            errorMessage={errors.observations?.message}
            placeholder="Informações adicionais (opcional)"
          />
        </S.FullWidthWrapper>
      </S.Grid>
    </S.Section>
  )
}
