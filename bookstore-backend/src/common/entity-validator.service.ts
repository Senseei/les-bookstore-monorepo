import { Injectable, Logger } from '@nestjs/common';
import { EntityTarget, DataSource } from 'typeorm';

@Injectable()
export class EntityValidatorService {
  constructor(private dataSource: DataSource) {}

  public getSafeEntityKey<T>(
    entityClass: EntityTarget<T>,
    key: string,
    defaultKey: keyof T,
  ): keyof T {
    try {
      const metadata = this.dataSource.getMetadata(entityClass);
      const columns = metadata.columns.map((col) => col.propertyName);

      return columns.includes(key) ? (key as keyof T) : defaultKey;
    } catch (error) {
      Logger.error(
        'Error validating entity key',
        error,
        'EntityValidatorService',
      );
      return defaultKey;
    }
  }
}
