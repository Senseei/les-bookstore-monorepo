// Input mask utilities for Brazilian formats

export const formatCPF = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')

  // Apply CPF mask: 000.000.000-00
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  return digits
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatPhone = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')

  // Apply phone mask: (00) 00000-0000 or (00) 0000-0000
  if (digits.length <= 11) {
    if (digits.length <= 10) {
      // Landline format: (00) 0000-0000
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    } else {
      // Mobile format: (00) 00000-0000
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
    }
  }

  // If more than 11 digits, truncate and format as mobile
  return digits.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

export const formatZipCode = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')

  // Apply ZIP code mask: 00000-000
  if (digits.length <= 8) {
    return digits.replace(/(\d{5})(\d)/, '$1-$2')
  }

  return digits.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2')
}

export const formatDate = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')

  // Apply date mask: DD/MM/YYYY
  if (digits.length <= 8) {
    return digits
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
  }

  return digits.slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
}

// Remove mask to get clean value for validation/submission
export const removeMask = (value: string): string => {
  return value.replace(/\D/g, '')
}

// Validate if masked input has minimum required digits
export const hasMinimumDigits = (value: string, minDigits: number): boolean => {
  const digits = removeMask(value)
  return digits.length >= minDigits
}
