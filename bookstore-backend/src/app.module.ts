import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/nestjs/modules/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@infrastructure/nestjs/modules/auth.module';
import { UsersModule } from '@infrastructure/nestjs/modules/users.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
