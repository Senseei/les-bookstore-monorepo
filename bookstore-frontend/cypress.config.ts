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
    },
    setupNodeEvents(on, config) {
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