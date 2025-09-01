import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { ValidationErrorFormatter } from '@common/validation-error.formatter';
import { InvalidBodyException } from '@common/exceptions/invalid-body.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        console.log(errors);
        const errorMessages = ValidationErrorFormatter.format(errors);
        return new InvalidBodyException(errorMessages);
      },
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(
    `Server running on http://localhost:${process.env.PORT ?? 3000}`,
    'Bootstrap',
  );
}
bootstrap().catch((error) => {
  Logger.error('Failed to start the application', error, 'Bootstrap');
  process.exit(1);
});
