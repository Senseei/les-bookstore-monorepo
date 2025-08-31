import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@domain/user.entity';
import { UsersRepositoryImpl } from '@infrastructure/persistence/typeorm/repositories/users.repository';
import { UsersService } from '@application/users/use-cases/users.service';
import { Address } from '@domain/address.entity';
import { CreateNewUser } from '@application/users/use-cases/create-new-user.usecase';
import { UsersController } from '@presentation/users/users.controller';
import { ChangeUserPassword } from '@application/users/use-cases/change-user-password.usecase';
import { UsersWebService } from '@presentation/users/users.webservice';

const USE_CASES = [CreateNewUser, ChangeUserPassword];

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryImpl,
    },
    UsersService,
    UsersWebService,
    ...USE_CASES,
  ],
  exports: [UsersService, ...USE_CASES],
})
export class UsersModule {}
