import type { ReactNode } from 'react'

export interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: string[]
  fallbackPath?: string
}
