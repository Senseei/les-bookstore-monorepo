import { defineConfig } from 'cypress'
import { defineConfig as defineViteConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      API_URL: 'http://localhost:3000', // Backend API URL
      TEST_DATABASE_URL: 'postgresql://postgres:postgres@localhost:5433/bookstore_test_db',
    },
    setupNodeEvents(on, config) {
      // Task to reset test database before each test
      on('task', {
        async resetTestDatabase() {
          try {
            const apiUrl = config.env.API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/api/test/reset-database`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (!response.ok) {
              throw new Error(`Failed to reset database: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('✅ Database reset successful:', result);
            return { success: true, data: result };
          } catch (error) {
            console.error('❌ Failed to reset test database:', error);
            
            // Check if it's a connection error
            if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
              return { 
                success: false, 
                error: 'Backend server is not running. Please start the backend server on port 3000.',
                code: 'CONNECTION_REFUSED'
              };
            }
            
            return { 
              success: false, 
              error: error instanceof Error ? error.message : String(error),
              code: 'UNKNOWN_ERROR'
            };
          }
        }
      });
      
      on('dev-server:start', async (options) => {
        const viteConfig = defineViteConfig({
          plugins: [react()],
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
          },
          server: {
            port: 5173,
            host: '127.0.0.1',
          },
        })
        
        // @ts-ignore
        return require('cypress-vite').createDevServer({
          options,
          viteConfig,
        })
      })
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
})