import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { SignUpAddressDTO } from './signup-address.dto';
import { Gender } from '@users/enums/gender.enum';
import { Type } from 'class-transformer';

export class NewUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SignUpAddressDTO)
  address: SignUpAddressDTO;
}
