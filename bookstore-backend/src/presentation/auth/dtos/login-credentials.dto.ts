import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialsDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
