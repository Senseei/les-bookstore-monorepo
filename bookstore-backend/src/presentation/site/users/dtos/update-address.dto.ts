import { AddressPurpose } from '@domain/user/enums/address-purpose.enum';
import { AddressType } from '@domain/user/enums/address-type.enum';
import { IsCep } from '@presentation/decorators/validators/cep.validator';
import { IsEnum, IsString } from 'class-validator';

export class UpdateAddressDTO {
  @IsEnum(AddressType)
  type: AddressType;

  @IsEnum(AddressPurpose)
  purpose: AddressPurpose;

  @IsString()
  addressName: string;

  @IsCep()
  postalCode: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
