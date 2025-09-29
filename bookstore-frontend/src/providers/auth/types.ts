import type { ReactNode } from 'react'

import type { NewUserDTO } from '@/dtos/user'
import type { JwtToken } from '@/utils'

export interface AuthState {
  token: JwtToken | null
  isLoading: boolean
  error: string | null
}

export interface AuthContextValue {
  // State
  token: JwtToken | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  // Actions
  signUp: (userData: NewUserDTO) => Promise<{
    success: boolean
    data?: unknown
    error?: string
  }>
  signIn: (credentials: { email: string; password: string }) => Promise<{
    success: boolean
    data?: JwtToken
    error?: string
  }>
  signOut: () => Promise<void>
  clearError: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
