import { Envelope, MapPin, Phone } from 'phosphor-react'

import * as S from './styles'

interface ContactInfoProps {
  email: string
  // phoneAreaCode: string
  phoneNumber: string
  address: string
}

export const ContactInfo = ({
  email,
  // phoneAreaCode,
  phoneNumber,
  address,
}: ContactInfoProps) => {
  return (
    <S.ContactInfo>
      <S.ContactItem>
        <Envelope size={16} />
        <span>{email}</span>
      </S.ContactItem>
      <S.ContactItem>
        <Phone size={16} />
        <span>
          {/* +55 ({phoneAreaCode}) {phoneNumber} */}
          +55 {phoneNumber}
        </span>
      </S.ContactItem>
      <S.ContactItem>
        <MapPin size={16} />
        <S.AddressText>{address}</S.AddressText>
      </S.ContactItem>
    </S.ContactInfo>
  )
}
