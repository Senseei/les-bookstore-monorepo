import { ORMS } from '@infrastructure/nestjs/modules/orms';
import { Module } from '@nestjs/common';

@Module({
  providers: [],
  imports: [ORMS.typeorm()],
  exports: [],
})
export class DatabaseModule {}
