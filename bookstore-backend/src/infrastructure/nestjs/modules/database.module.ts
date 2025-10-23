import { ORMS } from '@infrastructure/nestjs/modules/orms';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';

@Module({
  providers: [],
  imports: [ORMS.typeorm()],
  exports: [],
})
export class DatabaseModule implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {
    initializeTransactionalContext();
  }

  onApplicationBootstrap(): void {
    addTransactionalDataSource(this.dataSource);
  }
}
