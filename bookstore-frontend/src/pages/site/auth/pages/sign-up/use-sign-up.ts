import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useAuth } from '@/hooks'
import { useToast } from '@/providers/toast/use-toast'
import { ROUTES } from '@/routes/constants'
import {
  formatCPF,
  formatDate,
  formatPhone,
  formatZipCode,
} from '@/utils/input-masks'

import { mapFormDataToNewUserDTO } from './mappers'
import type { SignUpFormData } from './types'

type InputChangeEvent = React.ChangeEvent<{ value: string }>

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<SignUpFormData>()

  const { signUp, isLoading, error } = useAuth()
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()

  const password = watch('password')

  const onSubmit = async (data: SignUpFormData) => {
    // Map form data to DTO for backend
    const newUserData = mapFormDataToNewUserDTO(data)

    // eslint-disable-next-line no-console
    console.log('New User DTO:', newUserData)

    // Send data to backend API
    const result = await signUp(newUserData)

    if (result.success) {
      // Handle successful signup (redirect, show success message, etc.)
      // Show success toast
      showSuccess('Conta criada com sucesso! Redirecionando...', 3000)

      // Redirect to login page after a short delay
      window.setTimeout(() => {
        navigate(ROUTES.LOGIN)
      }, 3000)
    } else {
      // Error is already handled by the useAuth hook
      // eslint-disable-next-line no-console
      console.error('Signup failed:', result.error)

      // Show error toast
      showError(result.error || 'Erro ao criar conta. Tente novamente.', 5000)
    }
  }

  // Helper functions for masked inputs
  const registerCPF = (validationRules: object) => ({
    ...register('cpf', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatCPF(e.target.value)
      setValue('cpf', maskedValue, { shouldValidate: true })
    },
  })

  const registerPhone = (validationRules: object) => ({
    ...register('phone', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatPhone(e.target.value)
      setValue('phone', maskedValue, { shouldValidate: true })
    },
  })

  const registerZipCode = (validationRules: object) => ({
    ...register('address.zipCode', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatZipCode(e.target.value)
      setValue('address.zipCode', maskedValue, { shouldValidate: true })
    },
  })

  const registerBirthDate = (validationRules: object) => ({
    ...register('birthDate', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatDate(e.target.value)
      setValue('birthDate', maskedValue, { shouldValidate: true })
    },
  })

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    registerCPF,
    registerPhone,
    registerZipCode,
    registerBirthDate,
    control,
    passwordValue: password || '',
    // Auth state
    isLoading,
    error,
  }
}
