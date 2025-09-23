import { AddressService, UsersService } from '@application/users/services';
import {
  AddUserAddress,
  ChangeUserPassword,
  CreateNewUser,
  RemoveUserAddress,
  UpdateUser,
  UpdateUserAddress,
} from '@application/users/use-cases';
import { AddressValidator } from '@application/users/validators/address.validator';
import {
  CpfExistenceStrategy,
  EmailExistenceStrategy,
  UserValidationStrategy,
} from '@application/users/validators/strategies';
import { UserValidator } from '@application/users/validators/user.validator';
import { Address } from '@domain/user/address.entity';
import { User } from '@domain/user/user.entity';
import {
  AddressessRepositoryImpl,
  UsersRepositoryImpl,
} from '@infrastructure/persistence/typeorm/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@presentation/users/users.controller';
import { UsersWebService } from '@presentation/users/users.webservice';

const USE_CASES = [
  CreateNewUser,
  ChangeUserPassword,
  UpdateUser,
  AddUserAddress,
  UpdateUserAddress,
  RemoveUserAddress,
];
const VALIDATION_STRATEGIES = [EmailExistenceStrategy, CpfExistenceStrategy];

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [
    ...VALIDATION_STRATEGIES,
    {
      provide: 'UserValidationStrategies',
      useFactory: (
        emailStrategy: EmailExistenceStrategy,
        cpfStrategy: CpfExistenceStrategy,
      ): UserValidationStrategy[] => [emailStrategy, cpfStrategy],
      inject: [EmailExistenceStrategy, CpfExistenceStrategy],
    },
    UserValidator,
    AddressValidator,
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryImpl,
    },
    {
      provide: 'AddressesRepository',
      useClass: AddressessRepositoryImpl,
    },
    UsersService,
    AddressService,
    UsersWebService,
    ...USE_CASES,
  ],
  exports: [UsersService, AddressService, ...USE_CASES],
})
export class UsersModule {}
