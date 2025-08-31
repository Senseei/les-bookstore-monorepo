import { Module } from '@nestjs/common';
import { ORMS } from '@infrastructure/nestjs/modules/orms';
import { EntityValidatorService } from '@infrastructure/persistence/typeorm/entity-validator.service';

@Module({
  providers: [EntityValidatorService],
  imports: [ORMS.typeorm()],
  exports: [EntityValidatorService],
})
export class DatabaseModule {}
