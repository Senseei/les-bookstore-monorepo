import { AddressPurpose } from '@domain/user/enums/address-purpose.enum';
import { AddressType } from '@domain/user/enums/address-type.enum';
import { IsCep } from '@presentation/decorators/validators/cep.validator';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
