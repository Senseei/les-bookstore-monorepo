import { AddressType } from '@users/enums/address-type.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SignUpAddressDTO {
  @IsEnum(AddressType)
  type: AddressType;

  @IsNotEmpty()
  @IsString()
  addressName: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
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
