import type {
  Control,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

import type {
  AddressTypeValue,
  BrazilianStateCode,
  Gender,
} from '@/utils/types'

export interface SignUpFormData {
  name: string
  cpf: string
  email: string
  password: string
  confirmPassword: string
  gender: Gender
  birthDate: string
  phone: string
  // Address
  addressIdentifier: string
  residenceType: AddressTypeValue | ''
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: BrazilianStateCode
  zipCode: string
  observations: string
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
