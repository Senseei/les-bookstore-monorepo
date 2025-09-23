# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Step-by-Step Testing Commands

### 1. Start the Test Database

```bash
cd bookstore-backend
yarn docker:test-db
```

*This starts only the PostgreSQL test database container on port 5433*

### 2. Initialize/Setup the Test Database

```bash
yarn test:db:setup
```

*This creates all tables based on your NestJS entities in the test database*

### 3. Start the Backend in Test Mode (Optional)

```bash
yarn start:test
```

*This starts your NestJS backend connected to the test database*

### 4. Run Cypress E2E Tests

```bash
cd ../bookstore-frontend
yarn test:e2e:open  # Interactive mode with Cypress UI
# OR
yarn test:e2e       # Headless mode (runs all tests automatically)
```

## Alternative: One-Command Setup

If you want to do everything in one go:

```bash
cd bookstore-backend
yarn test:e2e:setup  # Starts test DB + initializes tables
cd ../bookstore-frontend
yarn test:e2e:open   # Run tests
```

## Reset Database Between Test Runs

If you need to clean the database:

```bash
cd bookstore-backend
yarn test:db:reset
```

## Quick Test Verification

To verify the test database is working:

1. **Check if test database is running:**

   ```bash
   docker ps | grep postgres-test
   ```

2. **Check if tables were created:**

   ```bash
   yarn test:db:setup
   ```

   *Look for output showing created tables*

3. **In your Cypress tests, use the reset command:**

   ```typescript
   beforeEach(() => {
     cy.resetTestDatabase();
   });
   ```

## Full Workflow Example

```bash
# Terminal 1 - Setup
cd bookstore-backend
yarn docker:test-db
yarn test:db:setup

# Terminal 2 - Backend (if needed)
yarn start:test

# Terminal 3 - Tests
cd ../bookstore-frontend
yarn test:e2e:open
```
