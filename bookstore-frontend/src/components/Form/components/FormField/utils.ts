import {
  formatCPF,
  formatDate,
  formatPhone,
  formatZipCode,
} from '@/utils/input-masks'

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
