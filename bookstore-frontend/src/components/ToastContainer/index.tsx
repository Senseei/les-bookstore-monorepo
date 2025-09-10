import type { ReactNode } from 'react'

import { Alert } from '@/components/Alert'
import type { ToastMessage } from '@/providers/toast/types'

import * as S from './styles'

interface ToastContainerProps {
  toasts: ToastMessage[]
  onRemoveToast: (id: string) => void
  children?: ReactNode
}

export const ToastContainer = ({
  toasts,
  onRemoveToast,
  children,
}: ToastContainerProps) => {
  return (
    <>
      {children}
      <S.ToastContainer>
        {toasts.map((toast) => (
          <Alert
            key={toast.id}
            variant={toast.variant}
            onClose={() => onRemoveToast(toast.id)}
          >
            {toast.message}
          </Alert>
        ))}
      </S.ToastContainer>
    </>
  )
}
