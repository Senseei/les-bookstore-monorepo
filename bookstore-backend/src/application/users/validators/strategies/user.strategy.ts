import { NewUserDTO } from '@presentation/auth/dtos/new-user.dto';
import { UpdateUserDTO } from '@presentation/site/users/dtos';

export interface UserValidationStrategy {
  validate(dto: NewUserDTO | UpdateUserDTO, userId?: string): Promise<void>;
}
