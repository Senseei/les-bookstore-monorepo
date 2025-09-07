import type { NewUserDTO } from '@/dtos/user'
import { removeMask } from '@/utils/input-masks'

import type { SignUpFormData } from './types'

/**
 * Maps SignUpFormData to NewUserDTO for backend API
 * Handles data transformation, cleaning, and field mapping
 */
export const mapFormDataToNewUserDTO = (
  formData: SignUpFormData,
): NewUserDTO => {
  return {
    // Personal data - direct mapping with data cleaning
    email: formData.email.trim(),
    password: formData.password,
    name: formData.name.trim(),
    cpf: removeMask(formData.cpf),
    phone: removeMask(formData.phone),
    gender: formData.gender,
    birthDate: parseFormDateToDate(formData.birthDate),

    // Address - nested structure with field name mapping
    address: {
      type: formData.address.residenceType as string, // Map residenceType -> type
      addressName: formData.address.identifier.trim(), // Map identifier -> addressName
      postalCode: removeMask(formData.address.zipCode), // Map zipCode -> postalCode
      street: formData.address.street.trim(),
      number: formData.address.number.trim(),
      complement: formData.address.complement?.trim() || undefined,
      district: formData.address.neighborhood.trim(), // Map neighborhood -> district
      city: formData.address.city.trim(),
      state: formData.address.state,
    },
  }
}

/**
 * Converts form date string (DD/MM/YYYY) to Date object
 */
const parseFormDateToDate = (dateString: string): Date => {
  // Remove any masks and convert DD/MM/YYYY to Date
  const cleanDate = dateString.replace(/\D/g, '') // Remove non-digits
  const day = cleanDate.slice(0, 2)
  const month = cleanDate.slice(2, 4)
  const year = cleanDate.slice(4, 8)

  return new Date(`${year}-${month}-${day}`)
}
