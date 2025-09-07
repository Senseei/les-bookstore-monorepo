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
  // Address - nested structure to match backend
  address: {
    identifier: string // addressName in backend
    residenceType: AddressTypeValue | '' // type in backend
    street: string
    number: string
    complement: string
    neighborhood: string // district in backend
    city: string
    state: BrazilianStateCode
    zipCode: string // postalCode in backend
    observations: string // not sent to backend
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
