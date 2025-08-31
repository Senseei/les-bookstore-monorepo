import { NewUserDTO } from '@presentation/auth/dtos/new-user.dto';
import { UpdateUserDTO } from '@presentation/users/dtos/update-user.dto';

export interface UserValidationStrategy {
  validate(dto: NewUserDTO | UpdateUserDTO, userId?: string): Promise<void>;
}
