import type { ReactNode } from 'react'

export interface ToastMessage {
  id: string
  variant: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export interface ToastContextValue {
  toasts: ToastMessage[]
  addToast: (
    message: string,
    variant?: 'success' | 'error' | 'warning' | 'info',
    duration?: number,
  ) => string
  removeToast: (id: string) => void
  clearAllToasts: () => void
  showSuccess: (message: string, duration?: number) => string
  showError: (message: string, duration?: number) => string
  showWarning: (message: string, duration?: number) => string
  showInfo: (message: string, duration?: number) => string
}

export interface ToastProviderProps {
  children: ReactNode
}
