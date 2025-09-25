import { Gender } from '@domain/user/enums/gender.enum';
import { IsBrPhone } from '@presentation/decorators/validators/br-phone.validator';
import { IsCpf } from '@presentation/decorators/validators/cpf.validator';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsCpf()
  cpf: string;

  @IsBrPhone()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}
