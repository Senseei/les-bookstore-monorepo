import { Module } from '@nestjs/common';
import { EntityValidatorService } from './entity-validator.service';

@Module({
  providers: [EntityValidatorService],
  exports: [EntityValidatorService],
})
export class CommonModule {}
