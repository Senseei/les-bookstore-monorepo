import type {
  Control,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

import type { Gender } from '@/utils/types'

export interface SignUpFormData {
  name: string
  gender: Gender
  birthDate: string
  cpf: string
  phone: string
  email: string
  password: string
  confirmPassword: string

  address: {
    identifier: string
    zipCode: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    residenceType: string
  }
}

export interface FormValidation {
  [key: string]: RegisterOptions
}

export interface FormProps {
  register: UseFormRegister<SignUpFormData>
  errors: FieldErrors<SignUpFormData>
  registerCPF?: (validationRules: object) => object
  registerPhone?: (validationRules: object) => object
  registerZipCode?: (validationRules: object) => object
  registerBirthDate?: (validationRules: object) => object
  control?: Control<SignUpFormData>
  passwordValue?: string
}
