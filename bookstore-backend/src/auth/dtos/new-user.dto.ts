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
  birthDate: Date;

  @ValidateNested()
  address: SignUpAddressDTO;
}
