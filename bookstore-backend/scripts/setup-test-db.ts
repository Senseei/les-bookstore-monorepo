import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables before importing AppModule
process.env.NODE_ENV = 'test';
dotenv.config({ path: path.resolve(__dirname, '../.env.test') });

// Now import AppModule after environment is set
import { AppModule } from '../src/app.module';

async function setupTestDatabase() {
  console.log('🔧 Setting up test database...');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'], // Keep some logging for debugging
      abortOnError: false,
    });

    const configService = app.get(ConfigService);

    // Get database connection
    const dataSource = app.get(DataSource);

    console.log('📊 Database connection established');
    console.log(`📝 Database: ${configService.get('DATABASE_NAME')}`);
    console.log(
      `🏠 Host: ${configService.get('DATABASE_HOST')}:${configService.get('DATABASE_PORT')}`,
    );
    console.log(`🌍 Environment: ${configService.get('NODE_ENV')}`);

    // Wait for the database connection to be ready
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    // Verify tables are created
    const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log(
      `📋 Created ${tables.length} tables:`,
      tables.map((t) => t.table_name).join(', '),
    );

    console.log('✅ Test database setup completed');

    await app.close();
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to setup test database:', error);

    // Provide more specific error information
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Make sure PostgreSQL is running and accessible');
      console.error('💡 Try running: yarn docker:test-db');
    } else if (
      error.message?.includes('database') &&
      error.message?.includes('does not exist')
    ) {
      console.error(
        '💡 Database does not exist. It will be created automatically if using Docker.',
      );
    }

    process.exit(1);
  }
}

if (require.main === module) {
  setupTestDatabase();
}

export { setupTestDatabase };
