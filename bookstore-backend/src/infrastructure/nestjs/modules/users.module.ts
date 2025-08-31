import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@domain/user.entity';
import { UsersRepositoryImpl } from '@infrastructure/persistence/typeorm/repositories/users.repository';
import { UsersService } from '@application/users/use-cases/users.service';
import { Address } from '@domain/address.entity';
import { CreateNewUser } from '@application/users/use-cases/create-new-user.usecase';

const USE_CASES = [CreateNewUser];

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryImpl,
    },
    UsersService,
    ...USE_CASES,
  ],
  exports: [UsersService, ...USE_CASES],
})
export class UsersModule {}
