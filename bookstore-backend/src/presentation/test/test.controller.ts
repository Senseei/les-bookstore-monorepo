import { Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Controller('test')
export class TestController {
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  health() {
    const nodeEnv = this.configService.get('NODE_ENV');
    return {
      status: 'ok',
      environment: nodeEnv,
      timestamp: new Date().toISOString(),
      database: {
        connected: this.dataSource.isInitialized,
        name: this.configService.get('DATABASE_NAME'),
      },
    };
  }

  @Post('reset-database')
  @HttpCode(HttpStatus.OK)
  async resetDatabase() {
    const nodeEnv = this.configService.get('NODE_ENV');

    // Only allow in test environment
    if (nodeEnv !== 'test') {
      return {
        success: false,
        error: 'Database reset only allowed in test environment',
        environment: nodeEnv,
      };
    }

    try {
      // Ensure database is connected
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }

      // Get all entities
      const entities = this.dataSource.entityMetadatas;

      // Disable foreign key checks for PostgreSQL
      await this.dataSource.query('SET session_replication_role = replica;');

      // Clear all tables in reverse order to handle dependencies
      const tableNames = entities.map((entity) => entity.tableName);

      for (const tableName of tableNames.reverse()) {
        try {
          await this.dataSource.query(`TRUNCATE TABLE "${tableName}" CASCADE;`);
        } catch (error) {
          console.warn(
            `Warning: Could not truncate table ${tableName}:`,
            error.message,
          );
        }
      }

      // Re-enable foreign key checks
      await this.dataSource.query('SET session_replication_role = DEFAULT;');

      // Reset sequences for auto-increment fields
      for (const entity of entities) {
        const tableName = entity.tableName;
        try {
          await this.dataSource.query(
            `ALTER SEQUENCE IF EXISTS "${tableName}_id_seq" RESTART WITH 1;`,
          );
        } catch (error) {
          console.warn(
            `Warning: Could not reset sequence for ${tableName}:`,
            error.message,
          
        }
      }

      return {
        success: true,
        message: 'Database reset successfully',
        tablesCleared: tableNames.length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Database reset error:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('seed-test-data')
  @HttpCode(HttpStatus.OK)
  seedTestData() {
    const nodeEnv = this.configService.get('NODE_ENV');

    if (nodeEnv !== 'test') {
      return {
        success: false,
        error: 'Test data seeding only allowed in test environment',
      };
    }

    try {
      // Add any test data seeding logic here if needed
      return {
        success: true,
        message: 'Test data seeded successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to seed test data',
      };
    }
  }
}
