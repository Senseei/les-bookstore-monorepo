import React from 'react'
import { useParams } from 'react-router'

import { Button } from '@/components'

import { AddressForm } from './components/address-form'
import { AddressList } from './components/address-list'
import { PasswordForm } from './components/password-form'
import { ProfileEditForm } from './components/profile-edit-form'
import * as S from './styles'
import type { Address, PasswordChangeData } from './types'
import { useProfileEdit } from './use-profile-edit'

export const ProfileEdit = () => {
  const { id: userId } = useParams<{ id?: string }>() // Captura o ID da URL se existir

  const {
    // Estado principal
    customer,
    loading,
    saving,
    hasLoadError,

    // Função para salvar perfil
    saveProfile,

    // Gerenciamento de endereços
    editingAddress,
    startAddingAddress,
    startEditingAddress,
    saveAddress,
    removeAddress,
    cancelAddressEditing,

    // Alteração de senha
    setPasswordFormData,
    changePassword,

    // Funções de carregamento
    loadProfile,
  } = useProfileEdit(userId)

  // Estados de controle de UI
  const [showPasswordForm, setShowPasswordForm] = React.useState(false)
  const [showAddressForm, setShowAddressForm] = React.useState(false)

  const handleAddAddress = () => {
    startAddingAddress()
    setShowAddressForm(true)
  }

  const handleEditAddress = (address: Address) => {
    startEditingAddress(address)
    setShowAddressForm(true)
  }

  const handleSaveAddress = async (addressData: Omit<Address, 'id'>) => {
    await saveAddress(addressData)
    setShowAddressForm(false)
  }

  const handleDeleteAddress = async (addressId: string) => {
    await removeAddress(addressId)
  }

  const handlePasswordChange = async (passwordData: PasswordChangeData) => {
    // Atualizar os dados de senha no hook
    setPasswordFormData(passwordData)
    await changePassword()
    setShowPasswordForm(false)
  }

  if (loading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <S.LoadingText>Carregando perfil...</S.LoadingText>
        </S.LoadingContainer>
      </S.Container>
    )
  }

  if (hasLoadError || (!customer && !loading)) {
    return (
      <S.Container>
        <S.ErrorContainer>
          <S.ErrorText>Erro ao carregar perfil</S.ErrorText>
          <Button onClick={loadProfile}>Tentar Novamente</Button>
        </S.ErrorContainer>
      </S.Container>
    )
  }

  if (!customer) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <S.LoadingText>Carregando perfil...</S.LoadingText>
        </S.LoadingContainer>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Editar Perfil</S.Title>
        <S.Subtitle>Gerencie suas informações pessoais</S.Subtitle>
      </S.Header>

      {showPasswordForm ? (
        <PasswordForm
          onSave={handlePasswordChange}
          onCancel={() => setShowPasswordForm(false)}
          loading={saving}
        />
      ) : showAddressForm ? (
        <AddressForm
          address={editingAddress || undefined}
          onSave={handleSaveAddress}
          onCancel={() => {
            setShowAddressForm(false)
            cancelAddressEditing()
          }}
          loading={saving}
        />
      ) : (
        <>
          <ProfileEditForm
            customer={customer}
            onSave={saveProfile}
            loading={saving}
          />

          <S.ActionsContainer>
            <S.ActionButton onClick={() => setShowPasswordForm(true)}>
              🔒 Alterar Senha
            </S.ActionButton>
            <S.ActionButton onClick={handleAddAddress}>
              🏠 Adicionar Endereço
            </S.ActionButton>
          </S.ActionsContainer>

          <AddressList
            addresses={customer.addresses || []}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            loading={saving}
          />
        </>
      )}
    </S.Container>
  )
}
