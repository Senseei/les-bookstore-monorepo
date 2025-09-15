import { House, MapPin } from 'phosphor-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import type { AddressDTO } from '@/dtos/user/address'

import * as S from './styles'

interface CustomerAddressInfoProps {
  addresses: AddressDTO[]
}

export const CustomerAddressInfo = ({
  addresses,
}: CustomerAddressInfoProps) => {
  const formatPostalCode = (postalCode: string) => {
    return postalCode.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  const formatAddressType = (type: string) => {
    const types = {
      house: 'Casa',
      apartment: 'Apartamento',
      condo: 'Condomínio',
      work: 'Trabalho',
      rural: 'Rural',
    }
    return types[type as keyof typeof types] || type
  }

  const formatAddressPurpose = (purpose?: string) => {
    if (!purpose) return null

    const purposes = {
      billing: 'Cobrança',
      delivery: 'Entrega',
      both: 'Cobrança e Entrega',
    }
    return purposes[purpose as keyof typeof purposes] || purpose
  }

  if (!addresses || addresses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <MapPin size={24} />
            Endereços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <S.EmptyState>
            <House size={48} />
            <p>Nenhum endereço cadastrado</p>
          </S.EmptyState>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={24} />
          Endereços ({addresses.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.AddressList>
          {addresses.map((address) => (
            <S.AddressCard key={address.id}>
              <S.AddressHeader>
                <S.AddressTitle>{address.addressName}</S.AddressTitle>
                <S.AddressType>{formatAddressType(address.type)}</S.AddressType>
              </S.AddressHeader>

              <S.AddressDetails>
                <S.AddressLine>
                  {address.street}, {address.number}
                  {address.complement && ` - ${address.complement}`}
                </S.AddressLine>
                <S.AddressLine>
                  {address.district} - {address.city}, {address.state}
                </S.AddressLine>
                <S.AddressLine>
                  CEP: {formatPostalCode(address.postalCode)}
                </S.AddressLine>
                {address.purpose && (
                  <S.AddressLine>
                    <strong>Finalidade:</strong>{' '}
                    {formatAddressPurpose(address.purpose)}
                  </S.AddressLine>
                )}
              </S.AddressDetails>
            </S.AddressCard>
          ))}
        </S.AddressList>
      </CardContent>
    </Card>
  )
}
