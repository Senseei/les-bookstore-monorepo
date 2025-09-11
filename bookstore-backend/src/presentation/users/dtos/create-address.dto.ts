import { AddressType } from '@domain/enums/address-type.enum';
import { AddressPurpose } from '@domain/enums/address-purpose.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCep } from '@presentation/decorators/validators/cep.validator';

export class CreateAddressDTO {
  @IsEnum(AddressType)
  @IsNotEmpty()
  type: AddressType;

  @IsEnum(AddressPurpose)
  @IsNotEmpty()
  purpose: AddressPurpose;

  @IsString()
  @IsNotEmpty()
  addressName: string;

  @IsCep()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}
