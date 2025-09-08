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
import { UpdateUser } from '@application/users/use-cases/update-user.usecase';
import { EmailExistenceStrategy } from '@application/users/validators/strategies/email-existance.strategy';
import { CpfExistenceStrategy } from '@application/users/validators/strategies/cpf-existance.strategy';
import { UserValidationStrategy } from '@application/users/validators/strategies/user.strategy';
import { UserValidator } from '@application/users/validators/user.validator';
import { AddressessRepositoryImpl } from '@infrastructure/persistence/typeorm/repositories/address.repository';
import { AddUserAddress } from '@application/users/use-cases/add-user-address.usecase';
import { UpdateUserAddress } from '@application/users/use-cases/update-user-address.usecase';
import { RemoveUserAddress } from '@application/users/use-cases/remove-user-address.usecase';
import { GetUserAddresses } from '@application/users/use-cases/get-user-addresses.usecase';
import { AddressService } from '@application/users/use-cases/address.service';

const USE_CASES = [
  CreateNewUser,
  ChangeUserPassword,
  UpdateUser,
  AddUserAddress,
  UpdateUserAddress,
  RemoveUserAddress,
  GetUserAddresses,
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
