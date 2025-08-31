import { BaseRepository } from '@application/base.repository';
import { User } from '@domain/user.entity';

export interface UsersRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
}
