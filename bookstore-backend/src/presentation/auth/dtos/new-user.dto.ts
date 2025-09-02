import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SignUpAddressDTO } from './signup-address.dto';
import { Gender } from '@domain/enums/gender.enum';
import { Type } from 'class-transformer';
import { IsCpf } from '@presentation/decorators/validators/cpf.validator';
import { IsPassword } from '@presentation/decorators/validators/password.validator';
import { IsBrPhone } from '@presentation/decorators/validators/br-phone.validator';

export class NewUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsCpf()
  cpf: string;

  @IsBrPhone()
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
