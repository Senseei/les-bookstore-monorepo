import { Module } from '@nestjs/common';
import { EntityValidatorService } from './entity-validator.service';
import { CommonService } from './common.service';

@Module({
  providers: [EntityValidatorService, CommonService],
  exports: [EntityValidatorService],
})
export class CommonModule {}
