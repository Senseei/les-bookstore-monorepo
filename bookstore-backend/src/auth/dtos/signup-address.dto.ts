import { IsCep } from '@common/decorators/validators/cep.validator';
import { AddressType } from '@users/enums/address-type.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpAddressDTO {
  @IsEnum(AddressType)
  type: AddressType;

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
