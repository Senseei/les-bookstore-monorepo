import { AddressType } from '@domain/enums/address-type.enum';
import { AddressPurpose } from '@domain/enums/address-purpose.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsCep } from '@presentation/decorators/validators/cep.validator';

export class UpdateAddressDTO {
  @IsEnum(AddressType)
  @IsOptional()
  type?: AddressType;

  @IsEnum(AddressPurpose)
  @IsOptional()
  purpose?: AddressPurpose;

  @IsString()
  @IsOptional()
  addressName?: string;

  @IsCep()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;
}
