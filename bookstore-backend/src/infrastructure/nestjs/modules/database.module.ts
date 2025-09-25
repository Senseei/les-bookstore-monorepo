import { Module } from '@nestjs/common';
import { ORMS } from './orms';

@Module({
  providers: [],
  imports: [ORMS.typeorm()],
  exports: [],
})
export class DatabaseModule {}
