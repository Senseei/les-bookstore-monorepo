import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { PageHeader } from '@/pages/admin/layout/components'
import { ROUTES } from '@/routes/constants'

import { CustomerEditForm, LoadingState } from './components'
import * as S from './styles'
import type { Customer } from './types'
import { useCustomerEdit } from './use-customer-edit'

export const CustomerEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { customer, loading, error, updateCustomer, loadCustomer, updating } =
    useCustomerEdit()

  useEffect(() => {
    if (id) {
      loadCustomer(id)
    }
  }, [id, loadCustomer])

  const handleSave = async (customerData: Partial<Customer>) => {
    if (!id) return

    const success = await updateCustomer(id, customerData)
    if (success) {
      navigate(ROUTES.ADMIN_CUSTOMERS)
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.ADMIN_CUSTOMERS)
  }

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return (
      <S.Container>
        <PageHeader
          title="Editar Cliente"
          subtitle="Erro ao carregar dados do cliente"
        />
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Container>
    )
  }

  if (!customer) {
    return (
      <S.Container>
        <PageHeader
          title="Cliente não encontrado"
          subtitle="O cliente solicitado não foi encontrado"
        />
      </S.Container>
    )
  }

  return (
    <S.Container>
      <PageHeader
        title="Editar Cliente"
        subtitle="Altere os dados cadastrais do cliente"
      />

      <Card>
        <CardHeader>
          <CardTitle>Dados do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerEditForm
            customer={customer}
            onSave={handleSave}
            onCancel={handleCancel}
            loading={updating}
          />
        </CardContent>
      </Card>
    </S.Container>
  )
}
