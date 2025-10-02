import type { NewUserDTO } from '@/dtos/user'
import type { UserDTO } from '@/dtos/user/user'
import type { JwtToken } from '@/utils'

import { AxiosApp } from './axios-app'

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */
export class AuthService {
  /**
   * Sign up a new user
   */
  static async signUp(userData: NewUserDTO): Promise<UserDTO> {
    const response = await AxiosApp.post('/auth/sign-up', userData)
    return response.data
  }

  /**
   * Sign in an existing user
   */
  static async signIn(credentials: {
    email: string
    password: string
  }): Promise<JwtToken> {
    const response = await AxiosApp.post('/auth/sign-in', credentials)
    return response.data
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(refreshToken: string): Promise<JwtToken> {
    const response = await AxiosApp.post('/auth/refresh-token', {
      refreshToken,
    })
    return response.data
  }
}
