import { Module } from '@nestjs/common';
import { ORMS } from '@infrastructure/nestjs/modules/orms';

@Module({
  providers: [],
  imports: [ORMS.typeorm()],
  exports: [],
})
export class DatabaseModule {}
