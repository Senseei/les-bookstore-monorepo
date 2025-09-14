import {
  formatCPF,
  formatDate,
  formatPhone,
  formatZipCode,
} from '@/utils/input-masks'
import * as validationRules from '@/utils/validation-rules'

// Map field types to their corresponding mask functions
export const getFieldMask = (
  fieldType: string,
): ((value: string) => string) | null => {
  const maskMap: Record<string, (value: string) => string> = {
    cpf: formatCPF,
    phone: formatPhone,
    date: formatDate,
    zipCode: formatZipCode,
  }

  return maskMap[fieldType] || null
}

// Map field types to their corresponding validation rules
export const getFieldValidation = (
  fieldType: string,
  required: boolean,
  dependentValue?: string,
) => {
  const validationMap: Record<string, object> = {
    cpf: validationRules.cpfValidationRules,
    email: validationRules.emailValidationRules,
    password: validationRules.passwordValidationRules,
    phone: validationRules.phoneValidationRules,
    date: validationRules.birthDateValidationRules,
    zipCode: validationRules.zipCodeValidationRules,
    text: validationRules.personNameValidationRules,
    // Address-specific fields that allow numbers
    street: validationRules.addressTextValidationRules,
    neighborhood: validationRules.addressTextValidationRules,
    city: validationRules.addressTextValidationRules,
  }

  // Special case for confirmPassword - needs the password value for validation
  if (fieldType === 'confirmPassword' && dependentValue !== undefined) {
    return validationRules.confirmPasswordValidationRules(dependentValue)
  }

  const fieldValidation = validationMap[fieldType] || {}

  // If no specific validation found and field is required, add basic required rule
  if (Object.keys(fieldValidation).length === 0 && required) {
    return {
      required: 'Este campo é obrigatório',
    }
  }

  return fieldValidation
}
