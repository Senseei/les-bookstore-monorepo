import React from 'react'
import { useForm } from 'react-hook-form'

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

  const password = watch('password')

  const onSubmit = (data: SignUpFormData) => {
    // Map form data to DTO for backend
    const newUserData = mapFormDataToNewUserDTO(data)

    // eslint-disable-next-line no-console
    console.log('New User DTO:', newUserData)

    // TODO: Send newUserData to backend API
    // await createUser(newUserData)
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
  }
}
