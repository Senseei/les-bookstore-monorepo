import { Input } from '@/components'

import type { FormProps } from '../../types'
import * as S from './styles'

export const AddressForm = ({
  register,
  errors,
  formValidation,
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

        <Input
          label="Tipo de Residência"
          {...register('residenceType', formValidation.residenceType)}
          error={!!errors.residenceType}
          errorMessage={errors.residenceType?.message}
          placeholder="Casa/Apartamento/etc"
          required
        />

        <Input
          label="CEP"
          {...register('zipCode', formValidation.zipCode)}
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

        <Input
          label="Estado"
          {...register('state', formValidation.state)}
          error={!!errors.state}
          errorMessage={errors.state?.message}
          placeholder="SP, RJ, MG, etc"
          required
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
