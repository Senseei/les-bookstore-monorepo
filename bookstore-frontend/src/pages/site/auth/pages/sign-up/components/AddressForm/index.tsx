import { Input, Select } from '@/components'

import { residenceTypeOptions, stateOptions } from '../../constants'
import type { FormProps } from '../../types'
import * as S from './styles'

export const AddressForm = ({ formData, errors, onChange }: FormProps) => {
  return (
    <S.Section>
      <S.SectionTitle>Endereço Principal</S.SectionTitle>
      <S.Grid>
        <Input
          label="Nome do Endereço"
          value={formData.addressIdentifier}
          onChange={(value) => onChange('addressIdentifier', value)}
          error={!!errors.addressIdentifier}
          errorMessage={errors.addressIdentifier}
          placeholder="Ex: Casa Principal"
        />

        <Select
          label="Tipo de Residência"
          value={formData.residenceType}
          onChange={(value) => onChange('residenceType', value)}
          error={!!errors.residenceType}
          helperText={errors.residenceType}
          placeholder="Selecione"
          options={residenceTypeOptions}
        />

        <Input
          label="CEP"
          value={formData.zipCode}
          onChange={(value) => onChange('zipCode', value)}
          error={!!errors.zipCode}
          errorMessage={errors.zipCode}
          placeholder="00000-000"
          required
        />

        <Input
          label="Logradouro"
          value={formData.street}
          onChange={(value) => onChange('street', value)}
          error={!!errors.street}
          errorMessage={errors.street}
          placeholder="Rua, Avenida, etc."
          required
        />

        <Input
          label="Número"
          value={formData.number}
          onChange={(value) => onChange('number', value)}
          error={!!errors.number}
          errorMessage={errors.number}
          placeholder="123"
          required
        />

        <Input
          label="Complemento"
          value={formData.complement}
          onChange={(value) => onChange('complement', value)}
          error={!!errors.complement}
          errorMessage={errors.complement}
          placeholder="Apto, Bloco, etc. (opcional)"
        />

        <Input
          label="Bairro"
          value={formData.neighborhood}
          onChange={(value) => onChange('neighborhood', value)}
          error={!!errors.neighborhood}
          errorMessage={errors.neighborhood}
          placeholder="Nome do bairro"
          required
        />

        <Input
          label="Cidade"
          value={formData.city}
          onChange={(value) => onChange('city', value)}
          error={!!errors.city}
          errorMessage={errors.city}
          placeholder="Nome da cidade"
          required
        />

        <Select
          label="Estado"
          value={formData.state}
          onChange={(value) => onChange('state', value)}
          error={!!errors.state}
          helperText={errors.state}
          placeholder="Selecione o estado"
          options={stateOptions}
        />

        <S.FullWidthWrapper>
          <Input
            label="Observações"
            value={formData.observations}
            onChange={(value) => onChange('observations', value)}
            error={!!errors.observations}
            errorMessage={errors.observations}
            placeholder="Informações adicionais (opcional)"
          />
        </S.FullWidthWrapper>
      </S.Grid>
    </S.Section>
  )
}
