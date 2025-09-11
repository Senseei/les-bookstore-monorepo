import { IsCep } from '@presentation/decorators/validators/cep.validator';
import { AddressType } from '@domain/enums/address-type.enum';
import { AddressPurpose } from '@domain/enums/address-purpose.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpAddressDTO {
  @IsEnum(AddressType)
  type: AddressType;

  @IsEnum(AddressPurpose)
  purpose: AddressPurpose;

  @IsNotEmpty()
  @IsString()
  addressName: string;

  @IsCep()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}
