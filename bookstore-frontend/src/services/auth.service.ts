import type { NewUserDTO } from '@/dtos/user'
import type { UserDTO } from '@/dtos/user/user'

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
    const response = await AxiosApp.post('/auth/signup', userData)
    return response.data
  }

  /**
   * Sign in an existing user
   */
  static async signIn(credentials: { email: string; password: string }) {
    const response = await AxiosApp.post('/auth/signin', credentials)
    return response.data
  }

  /**
   * Sign out current user
   */
  static async signOut() {
    const response = await AxiosApp.post('/auth/signout')
    return response.data
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken() {
    const response = await AxiosApp.post('/auth/refresh')
    return response.data
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser() {
    const response = await AxiosApp.get('/auth/me')
    return response.data
  }
}
