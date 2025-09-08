import { Address } from '@domain/address.entity';
import { AddressType } from '@domain/enums/address-type.enum';

export class AddressDTO {
  id: string;
  type: AddressType;
  addressName: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(address: Address) {
    this.id = address.id;
    this.type = address.type;
    this.addressName = address.addressName;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.district = address.district;
    this.city = address.city;
    this.state = address.state;
    this.postalCode = address.postalCode;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
  }
}
