import { useCallback, useEffect, useState } from 'react'

import { useAddress, useUser } from '@/hooks'
import { useToast } from '@/providers'
import type { CreateAddressData, UpdateUserData } from '@/services/user.service'

import type { Address, Customer, PasswordChangeData } from './types'

export interface UseProfileEditReturn {
  // Estado principal
  customer: Customer | null
  loading: boolean
  saving: boolean
  hasLoadError: boolean

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
  // Entity hooks
  const userHook = useUser()
  const addressHook = useAddress()
  const toast = useToast()

  // Estados principais
  const [loading, setLoading] = useState(false)
  const [hasLoadError, setHasLoadError] = useState(false)
  const [hasInitialLoad, setHasInitialLoad] = useState(false)

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

  // Get customer data from user hook
  const customer = userHook.user as Customer | null
  const saving = userHook.isSaving || addressHook.isAddressSaving

  // Carregamento inicial do perfil
  const loadProfile = useCallback(async () => {
    if (!userId) {
      toast.showError(
        'ID do usuário é obrigatório. Use a rota /profile/edit/:id',
      )
      return
    }

    setLoading(true)
    setHasLoadError(false) // Reset error state when starting a new load

    try {
      const result = await userHook.getUserById(userId)

      if (result.success && result.data) {
        setFormData(result.data as unknown as Partial<Customer>)
        setHasLoadError(false)
        if (!hasInitialLoad) {
          setHasInitialLoad(true)
        }
      } else {
        setHasLoadError(true)
        toast.showError(result.error || 'Erro ao carregar dados do perfil')
      }
    } catch {
      setHasLoadError(true)
      toast.showError('Erro ao carregar dados do perfil')
    } finally {
      setLoading(false)
    }
  }, [userId, userHook, toast, hasInitialLoad])

  useEffect(() => {
    if (userId && !hasInitialLoad) {
      setHasInitialLoad(true)
      loadProfile()
    }
  }, [userId]) // Removed loadProfile from dependencies to prevent infinite loops

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

    try {
      const result = await userHook.updateUser(
        formData.id,
        formData as UpdateUserData,
      )

      if (result.success) {
        setFormData(result.data as unknown as Partial<Customer>)
        setIsEditing(false)
        toast.showSuccess('Perfil atualizado com sucesso!')
      } else {
        toast.showError(result.error || 'Erro ao atualizar perfil')
      }
    } catch {
      toast.showError('Erro ao atualizar perfil')
    }
  }, [customer, formData, userHook, toast])

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

      try {
        if (editingAddress) {
          const result = await addressHook.updateAddress(
            customer.id,
            editingAddress.id,
            dataToSave as CreateAddressData,
          )

          if (result.success) {
            // Reload user data to get updated addresses
            await userHook.getUserById(customer.id)
            toast.showSuccess('Endereço atualizado com sucesso!')
          } else {
            toast.showError(result.error || 'Erro ao atualizar endereço')
          }
        } else {
          const result = await addressHook.createAddress(
            customer.id,
            dataToSave as CreateAddressData,
          )

          if (result.success) {
            // Reload user data to get updated addresses
            await userHook.getUserById(customer.id)
            toast.showSuccess('Endereço adicionado com sucesso!')
          } else {
            toast.showError(result.error || 'Erro ao adicionar endereço')
          }
        }

        cancelAddressEditing()
      } catch {
        toast.showError(
          editingAddress
            ? 'Erro ao atualizar endereço'
            : 'Erro ao adicionar endereço',
        )
      }
    },
    [
      customer,
      addressFormData,
      editingAddress,
      cancelAddressEditing,
      toast,
      addressHook,
      userHook,
    ],
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

      try {
        const result = await addressHook.deleteAddress(customer.id, addressId)

        if (result.success) {
          // Reload user data to get updated addresses
          await userHook.getUserById(customer.id)
          toast.showSuccess('Endereço removido com sucesso!')
        } else {
          toast.showError(result.error || 'Erro ao remover endereço')
        }
      } catch {
        toast.showError('Erro ao remover endereço')
      }
    },
    [customer, toast, addressHook, userHook],
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

    try {
      const result = await userHook.changeUserPassword(
        customer.id,
        passwordFormData,
      )

      if (result.success) {
        setPasswordFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        toast.showSuccess('Senha alterada com sucesso!')
      } else {
        toast.showError(
          result.error || 'Erro ao alterar senha. Verifique a senha atual.',
        )
      }
    } catch {
      toast.showError('Erro ao alterar senha. Verifique a senha atual.')
    }
  }, [customer, passwordFormData, toast, userHook])

  return {
    // Estado principal
    customer,
    loading,
    saving,
    hasLoadError,

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
