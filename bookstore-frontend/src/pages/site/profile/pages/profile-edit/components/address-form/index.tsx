import React, { useState } from 'react'

import { Button, Input, Select } from '@/components'
import { residenceTypeOptions, stateOptions } from '@/utils/constants'

import type { Address } from '../../types'
import * as S from './styles'

interface AddressFormProps {
  address?: Address
  onSave: (address: Omit<Address, 'id'>) => void
  onCancel: () => void
  loading?: boolean
}

export const AddressForm = ({
  address,
  onSave,
  onCancel,
  loading = false,
}: AddressFormProps) => {
  const [formData, setFormData] = useState({
    type: address?.type || 'house',
    addressName: address?.addressName || '',
    postalCode: address?.postalCode || '',
    street: address?.street || '',
    number: address?.number || '',
    complement: address?.complement || '',
    district: address?.district || '',
    city: address?.city || '',
    state: address?.state || '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Omit<Address, 'id'>)
  }

  return (
    <S.Container>
      <S.FormTitle>
        {address ? 'Editar Endereço' : 'Adicionar Endereço'}
      </S.FormTitle>

      <form onSubmit={handleSubmit}>
        <S.FormGrid>
          <Input
            label="Nome do Endereço"
            value={formData.addressName}
            onChange={(e) => handleInputChange('addressName', e.target.value)}
            required
            placeholder="Ex: Casa, Trabalho, Casa da Mãe"
          />

          <Select
            label="Tipo de Endereço"
            value={formData.type}
            onChange={(value) => handleInputChange('type', value)}
            options={residenceTypeOptions}
          />

          <Input
            label="CEP"
            value={formData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            required
            placeholder="00000-000"
          />

          <Input
            label="Logradouro"
            value={formData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            required
            placeholder="Nome da rua/avenida"
          />

          <Input
            label="Número"
            value={formData.number}
            onChange={(e) => handleInputChange('number', e.target.value)}
            required
            placeholder="123"
          />

          <Input
            label="Complemento"
            value={formData.complement}
            onChange={(e) => handleInputChange('complement', e.target.value)}
            placeholder="Apto 45, Bloco B, Casa 2"
          />

          <Input
            label="Bairro"
            value={formData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            required
          />

          <Input
            label="Cidade"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            required
          />

          <Select
            label="Estado"
            value={formData.state}
            onChange={(value) => handleInputChange('state', value)}
            placeholder="Selecione o estado"
            options={stateOptions}
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
