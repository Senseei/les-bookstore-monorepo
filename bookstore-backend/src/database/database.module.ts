import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: <string>configService.get('DATABASE_HOST'),
        port: parseInt(<string>configService.get('DB_PORT'), 10),
        username: <string>configService.get('DATABASE_USER'),
        password: <string>configService.get('DATABASE_PASSWORD'),
        database: <string>configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development', // Sync only in development
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        migrationsRun: true,
        ssl:
          configService.get('NODE_ENV') === 'production'
            ? {
                rejectUnauthorized:
                  configService.get('POSTGRES_SSL_REJECT_UNAUTHORIZED') ===
                  'true',
              }
            : false,
      }),
    }),
  ],
})
export class DatabaseModule {}
