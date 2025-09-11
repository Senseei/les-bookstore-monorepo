import React, { useState } from 'react'

import { Button, Input, Select } from '@/components'
import { formatDate } from '@/utils/input-masks'

import * as S from '../styles'
import type { Customer } from '../types'

interface ProfileEditFormProps {
  customer: Customer
  onSave: (data: Partial<Customer>) => void
  loading?: boolean
}

export const ProfileEditForm = ({
  customer,
  onSave,
  loading = false,
}: ProfileEditFormProps) => {
  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    cpf: customer.cpf || '',
    birthDate: customer.birthDate || '',
    gender: customer.gender || 'Masculino',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <S.FormGrid>
        <Input
          label="Nome Completo"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />

        <Input
          label="CPF"
          value={formData.cpf}
          onChange={(e) => handleInputChange('cpf', e.target.value)}
          required
        />

        <Input
          label="Data de Nascimento"
          value={formData.birthDate}
          onChange={(e) => {
            const maskedValue = formatDate(e.target.value)
            handleInputChange('birthDate', maskedValue)
          }}
          placeholder="DD/MM/AAAA"
          required
        />

        <Input
          label="Telefone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="(11) 99999-9999"
          required
        />

        <Select
          label="Gênero"
          value={formData.gender}
          onChange={(value) => handleInputChange('gender', value)}
          options={[
            { value: 'Masculino', label: 'Masculino' },
            { value: 'Feminino', label: 'Feminino' },
            { value: 'Outro', label: 'Outro' },
          ]}
        />
      </S.FormGrid>

      <S.FormActions>
        <Button type="submit" loading={loading}>
          Salvar Alterações
        </Button>
      </S.FormActions>
    </form>
  )
}
