import { Address } from '@domain/address.entity';

export class MinAddressDTO {
  id: string;
  street: string;
  city: string;
  state: string;

  constructor(address: Address) {
    this.id = address.id;
    this.street = address.street;
    this.city = address.city;
    this.state = address.state;
  }
}
