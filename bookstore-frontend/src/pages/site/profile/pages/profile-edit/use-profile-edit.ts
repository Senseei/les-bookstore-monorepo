import { useCallback, useEffect, useState } from 'react'

import { useToast } from '@/hooks/use-toast'

import { addressService } from './services/address.service'
import { userService } from './services/user.service'
import type { Address, Customer, PasswordChangeData } from './types'

export interface UseProfileEditReturn {
  // Estado principal
  customer: Customer | null
  loading: boolean
  saving: boolean

  // Edição de perfil
  isEditing: boolean
  formData: Partial<Customer>
  setFormData: (data: Partial<Customer>) => void
  startEditing: () => void
  cancelEditing: () => void
  saveProfile: () => Promise<void>

  // Gerenciamento de endereços
  editingAddress: Address | null
  addressFormData: Partial<Address>
  setAddressFormData: (data: Partial<Address>) => void
  startAddingAddress: () => void
  startEditingAddress: (address: Address) => void
  saveAddress: (addressData?: Partial<Address>) => Promise<void>
  removeAddress: (addressId: string) => Promise<void>
  cancelAddressEditing: () => void

  // Alteração de senha
  passwordFormData: PasswordChangeData
  setPasswordFormData: (data: PasswordChangeData) => void
  changePassword: () => Promise<void>

  // Funções de carregamento
  loadProfile: () => Promise<void>
}

export const useProfileEdit = (userId?: string): UseProfileEditReturn => {
  // Estados principais
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Estados de edição de perfil
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Customer>>({})

  // Estados de endereços
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [addressFormData, setAddressFormData] = useState<Partial<Address>>({})

  // Estado de senha
  const [passwordFormData, setPasswordFormData] = useState<PasswordChangeData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const toast = useToast()

  // Carregamento inicial do perfil
  const loadProfile = useCallback(async () => {
    if (!userId) {
      toast.showError(
        'ID do usuário é obrigatório. Use a rota /profile/edit/:id',
      )
      return
    }

    setLoading(true)

    try {
      const userData = await userService.getUserById(userId)
      setCustomer(userData)
      setFormData(userData)
    } catch {
      toast.showError('Erro ao carregar dados do perfil')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      loadProfile()
    }
  }, [userId])

  const startEditing = useCallback(() => {
    if (customer) {
      setFormData({ ...customer })
      setIsEditing(true)
    }
  }, [customer])

  const cancelEditing = useCallback(() => {
    setIsEditing(false)
    setFormData(customer || {})
  }, [customer])

  const saveProfile = useCallback(async () => {
    if (!customer || !formData.id) return

    setSaving(true)

    try {
      const updatedCustomer = await userService.updateUser(
        formData.id,
        formData,
      )
      setCustomer(updatedCustomer)
      setFormData(updatedCustomer)
      setIsEditing(false)
      toast.showSuccess('Perfil atualizado com sucesso!')
    } catch {
      toast.showError('Erro ao atualizar perfil')
    } finally {
      setSaving(false)
    }
  }, [customer, formData, toast])

  // Funções de endereços
  const startAddingAddress = useCallback(() => {
    setEditingAddress(null)
    setAddressFormData({
      type: 'house',
      addressName: '',
      postalCode: '',
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
    })
  }, [])

  const startEditingAddress = useCallback((address: Address) => {
    setEditingAddress(address)
    setAddressFormData({ ...address })
  }, [])

  const cancelAddressEditing = useCallback(() => {
    setEditingAddress(null)
    setAddressFormData({})
  }, [])

  const saveAddress = useCallback(
    async (addressDataParam?: Partial<Address>) => {
      if (!customer) return

      const dataToSave = addressDataParam || addressFormData
      if (!dataToSave) return

      setSaving(true)

      try {
        if (editingAddress) {
          const updatedAddress = await addressService.updateAddress(
            customer.id,
            editingAddress.id,
            dataToSave,
          )

          setCustomer((prev) => {
            if (!prev) return null

            const newState = {
              ...prev,
              addresses:
                prev.addresses?.map((addr) =>
                  addr.id === editingAddress.id ? updatedAddress : addr,
                ) || [],
            }

            return newState
          })

          toast.showSuccess('Endereço atualizado com sucesso!')
        } else {
          const newAddress = await addressService.createAddress(
            customer.id,
            dataToSave as {
              type: 'house' | 'apartment' | 'condo' | 'work' | 'rural'
              addressName: string
              postalCode: string
              street: string
              number: string
              complement?: string
              district: string
              city: string
              state: string
            },
          )

          setCustomer((prev) => {
            if (!prev) return null

            return {
              ...prev,
              addresses: [...(prev.addresses || []), newAddress],
            }
          })

          toast.showSuccess('Endereço adicionado com sucesso!')
        }

        cancelAddressEditing()
      } catch (error) {
        console.error('Erro ao salvar endereço:', error)
        toast.showError(
          editingAddress
            ? 'Erro ao atualizar endereço'
            : 'Erro ao adicionar endereço',
        )
      } finally {
        setSaving(false)
      }
    },
    [customer, addressFormData, editingAddress, cancelAddressEditing, toast],
  )

  const removeAddress = useCallback(
    async (addressId: string) => {
      if (!customer) return

      // Verificar se não é o último endereço residencial
      const address = customer.addresses?.find((addr) => addr.id === addressId)
      const residentialAddresses = customer.addresses?.filter(
        (addr) => addr.type === 'house',
      )

      if (
        address?.type === 'house' &&
        residentialAddresses &&
        residentialAddresses.length <= 1
      ) {
        toast.showError('Não é possível remover o único endereço residencial')
        return
      }

      setSaving(true)

      try {
        await addressService.deleteAddress(customer.id, addressId)

        setCustomer((prev) => {
          if (!prev) return null

          return {
            ...prev,
            addresses: prev.addresses?.filter((addr) => addr.id !== addressId),
          }
        })

        toast.showSuccess('Endereço removido com sucesso!')
      } catch {
        toast.showError('Erro ao remover endereço')
      } finally {
        setSaving(false)
      }
    },
    [customer, toast],
  )

  // Função de alteração de senha
  const changePassword = useCallback(async () => {
    if (!customer) return

    // Validações
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.showError('As senhas não coincidem')
      return
    }

    // Validar força da senha
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    if (!passwordRegex.test(passwordFormData.newPassword)) {
      toast.showError(
        'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial',
      )
      return
    }

    setSaving(true)

    try {
      await userService.changePassword(customer.id, passwordFormData)

      setPasswordFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      toast.showSuccess('Senha alterada com sucesso!')
    } catch {
      toast.showError('Erro ao alterar senha. Verifique a senha atual.')
    } finally {
      setSaving(false)
    }
  }, [customer, passwordFormData, toast])

  return {
    // Estado principal
    customer,
    loading,
    saving,

    // Edição de perfil
    isEditing,
    formData,
    setFormData,
    startEditing,
    cancelEditing,
    saveProfile,

    // Gerenciamento de endereços
    editingAddress,
    addressFormData,
    setAddressFormData,
    startAddingAddress,
    startEditingAddress,
    saveAddress,
    removeAddress,
    cancelAddressEditing,

    // Alteração de senha
    passwordFormData,
    setPasswordFormData,
    changePassword,

    // Funções de carregamento
    loadProfile,
  }
}
