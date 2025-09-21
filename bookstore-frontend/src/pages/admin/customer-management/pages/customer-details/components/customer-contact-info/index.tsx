import { Phone } from 'phosphor-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import type { UserDTO } from '@/dtos/user/user'

import * as S from './styles'

interface CustomerContactInfoProps {
  customer: UserDTO
}

export const CustomerContactInfo = ({ customer }: CustomerContactInfoProps) => {
  const formatPhone = (phone: string) => {
    // Remove any non-digits
    const cleaned = phone.replace(/\D/g, '')

    // Format as (XX) XXXX-XXXX or (XX) XXXXX-XXXX
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }

    return phone // Return as-is if doesn't match expected length
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Phone size={24} />
          Informações de Contato
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.InfoGrid>
          <S.InfoItem>
            <S.InfoLabel>Email</S.InfoLabel>
            <S.InfoValue>{customer.email}</S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Telefone</S.InfoLabel>
            <S.InfoValue>{formatPhone(customer.phone)}</S.InfoValue>
          </S.InfoItem>
        </S.InfoGrid>
      </CardContent>
    </Card>
  )
}
