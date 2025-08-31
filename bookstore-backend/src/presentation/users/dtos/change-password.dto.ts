import { IsPassword } from '@presentation/decorators/validators/password.validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsPassword()
  newPassword: string;
}
