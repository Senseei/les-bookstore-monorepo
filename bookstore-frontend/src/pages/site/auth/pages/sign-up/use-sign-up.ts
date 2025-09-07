import React from 'react'
import { useForm } from 'react-hook-form'

import {
  formatCPF,
  formatDate,
  formatPhone,
  formatZipCode,
  removeMask,
} from '@/utils/input-masks'

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
    // Remove masks before submitting
    // TODO sanitize the data
    const cleanData = {
      ...data,
      cpf: removeMask(data.cpf),
      phone: removeMask(data.phone),
      zipCode: removeMask(data.zipCode),
      birthDate: data.birthDate.replace(/\//g, '-'), // Convert DD/MM/YYYY to DD-MM-YYYY
    }

    // eslint-disable-next-line no-console
    console.log('Sign Up Data:', cleanData)
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
    ...register('zipCode', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatZipCode(e.target.value)
      setValue('zipCode', maskedValue, { shouldValidate: true })
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
