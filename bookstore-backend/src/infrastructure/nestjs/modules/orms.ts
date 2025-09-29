import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const ORMS = {
  typeorm: () =>
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        const isTest = nodeEnv === 'test';

        // Debug logging to verify configuration
        if (isTest) {
          console.log('🔍 Test Database Configuration:');
          console.log(`  Host: ${configService.get('DATABASE_HOST')}`);
          console.log(`  Port: ${configService.get('DATABASE_PORT')}`);
          console.log(`  Database: ${configService.get('DATABASE_NAME')}`);
          console.log(`  Environment: ${nodeEnv}`);
        }

        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT'), 10),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          // Always sync in test environment to ensure clean state
          synchronize: nodeEnv !== 'production',
          migrations: [`${__dirname}/migrations/*{.ts,.js}`],
          migrationsRun: !isTest, // Don't run migrations in test (use synchronize instead)
          dropSchema: isTest, // Drop schema on each test run for clean state
          ssl:
            nodeEnv === 'production'
              ? {
                  rejectUnauthorized:
                    configService.get('POSTGRES_SSL_REJECT_UNAUTHORIZED') ===
                    'true',
                }
              : false,
          // Test-specific optimizations
          logging: isTest ? false : ['error'],
          maxQueryExecutionTime: isTest ? 1000 : 10000,
          // Add retry configuration for test environment
          retryAttempts: isTest ? 3 : 10,
          retryDelay: isTest ? 1000 : 3000,
        };
      },
    }),
};
