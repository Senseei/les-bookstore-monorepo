import { AxiosApp } from '@/services/axios-app'

import type { Customer, PasswordChangeData } from '../types'

type Gender = 'male' | 'female' | 'other' // Valores em inglês para o backend
type AddressType = 'house' | 'apartment' | 'condo' | 'work' | 'rural'

// Mapeamento entre valores do frontend (português) e backend (inglês)
const mapGenderToBackend = (frontendGender: string): Gender => {
  const genderMapping: Record<string, Gender> = {
    Masculino: 'male',
    Feminino: 'female',
    Outro: 'other',
  }
  return genderMapping[frontendGender] || 'other'
}

const mapGenderFromBackend = (
  backendGender: Gender,
): 'Masculino' | 'Feminino' | 'Outro' => {
  const genderMapping: Record<Gender, 'Masculino' | 'Feminino' | 'Outro'> = {
    male: 'Masculino',
    female: 'Feminino',
    other: 'Outro',
  }
  return genderMapping[backendGender] || 'Outro'
}

// Funções para conversão de formato de data
const formatDateFromBackend = (backendDate: string): string => {
  // Converte de YYYY-MM-DD para DD/MM/AAAA
  // Remove a parte de hora se existir (ex: "2024-03-15T00:00:00.000Z" -> "2024-03-15")
  const dateOnly = backendDate.split('T')[0]
  const [year, month, day] = dateOnly.split('-')
  return `${day}/${month}/${year}`
}

const formatDateToBackend = (frontendDate: string): string => {
  // Converte de DD/MM/AAAA para YYYY-MM-DD
  const [day, month, year] = frontendDate.split('/')
  return `${year}-${month}-${day}`
}

interface BackendAddress {
  id: string
  type: AddressType
  addressName: string
  postalCode: string
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
  purpose: 'billing' | 'delivery' | 'both'
}

interface BackendUser {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  gender: Gender
  birthDate: string
  addresses?: BackendAddress[]
}

export interface UserService {
  getCurrentUser(): Promise<Customer>
  getUserById(id: string): Promise<Customer>
  updateUser(id: string, userData: Partial<Customer>): Promise<Customer>
  changePassword(id: string, passwordData: PasswordChangeData): Promise<void>
}

export class UserServiceImpl implements UserService {
  async getCurrentUser(): Promise<Customer> {
    // TODO: Implementar autenticação JWT
    throw new Error(
      'getCurrentUser() requer implementação de JWT. Use a rota /profile/edit/:id por enquanto.',
    )
  }

  async getUserById(id: string): Promise<Customer> {
    const response = await AxiosApp.get<BackendUser>(`/users/${id}`)
    const userData = response.data

    // Converter os dados do backend para o formato do frontend
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      phone: userData.phone,
      gender: mapGenderFromBackend(userData.gender), // Converte de inglês para português
      birthDate: formatDateFromBackend(userData.birthDate), // Converte para DD/MM/AAAA
      addresses: userData.addresses?.map((addr) => ({
        id: addr.id,
        type: addr.type,
        addressName: addr.addressName,
        postalCode: addr.postalCode,
        street: addr.street,
        number: addr.number,
        complement: addr.complement,
        district: addr.district,
        city: addr.city,
        state: addr.state,
        createdAt: '',
        updatedAt: '',
        purpose: addr.purpose,
      })),
    }
  }

  async updateUser(id: string, userData: Partial<Customer>): Promise<Customer> {
    // Preparar dados para o backend no formato esperado pelo UpdateUserDTO
    const updateData = {
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      phone: userData.phone,
      gender: userData.gender ? mapGenderToBackend(userData.gender) : undefined, // Converte de português para inglês
      birthDate: userData.birthDate
        ? formatDateToBackend(userData.birthDate)
        : undefined, // Converte para YYYY-MM-DD
    }

    const response = await AxiosApp.put<BackendUser>(`/users/${id}`, updateData)
    const updatedUserData = response.data

    // Retornar dados convertidos
    return {
      id: updatedUserData.id,
      name: updatedUserData.name,
      email: updatedUserData.email,
      cpf: updatedUserData.cpf,
      phone: updatedUserData.phone,
      gender: mapGenderFromBackend(updatedUserData.gender), // Converte de inglês para português
      birthDate: formatDateFromBackend(updatedUserData.birthDate), // Converte para DD/MM/AAAA
      addresses:
        updatedUserData.addresses?.map((addr: BackendAddress) => ({
          id: addr.id,
          type: addr.type,
          addressName: addr.addressName,
          postalCode: addr.postalCode,
          street: addr.street,
          number: addr.number,
          complement: addr.complement,
          district: addr.district,
          city: addr.city,
          state: addr.state,
          purpose: addr.purpose,
        })) || [],
    }
  }

  async changePassword(
    id: string,
    passwordData: PasswordChangeData,
  ): Promise<void> {
    const changePasswordData = {
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    }

    await AxiosApp.put(`/users/${id}/password`, changePasswordData)
  }
}

export const userService = new UserServiceImpl()
