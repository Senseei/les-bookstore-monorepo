import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from '@infrastructure/jwt/jwt.strategy';
import { AuthWebService } from '@presentation/auth/auth.service';
import { AuthController } from '@presentation/auth/auth.controller';
import { UsersModule } from '@infrastructure/nestjs/modules/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, AuthWebService],
  controllers: [AuthController],
})
export class AuthModule {}
