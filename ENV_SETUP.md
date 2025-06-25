# Environment Configuration Setup

This project uses environment-specific configurations based on `NODE_ENV`. The environment utilities are available in `src/utils/env.ts`.

## Available Environments

- **Development** (`NODE_ENV=development`): Local development environment
- **Staging** (`NODE_ENV=staging`): Testing environment before production
- **Production** (`NODE_ENV=production`): Live production environment

## Usage

### Running in Different Environments

The following npm scripts are available to run the application in different environments:

```bash
# Development (default)
npm run dev

# Staging
npm run dev:staging

# Production
npm run dev:prod
```

### Building for Different Environments

```bash
# Development (default)
npm run build

# Staging
npm run build:staging

# Production
npm run build:prod
```

### Starting the Built Application

```bash
# Development (default)
npm run start

# Staging
npm run start:staging

# Production
npm run start:prod
```

## Using Environment Configuration in Components

Import the environment utility in your components:

```typescript
import { env } from '../utils/env';

// Check current environment
if (env.isDevelopment) {
  // Development-only code
}

// Access environment-specific values
const apiEndpoint = `${env.apiUrl}/users`;

// Check feature flags
if (env.features.newUi) {
  // New UI is enabled
}
```

## Environment Configuration Values

The following values are available in the environment configuration:

| Property | Type | Description |
|----------|------|-------------|
| `env.current` | string | Current environment ('development', 'staging', 'production') |
| `env.isDevelopment` | boolean | Whether the current environment is development |
| `env.isStaging` | boolean | Whether the current environment is staging |
| `env.isProduction` | boolean | Whether the current environment is production |
| `env.apiUrl` | string | API base URL for the current environment |
| `env.assetsUrl` | string | Assets base URL for the current environment |
| `env.isDebugEnabled` | boolean | Whether debug mode is enabled |
| `env.features.newUi` | boolean | Whether the new UI feature is enabled |
| `env.features.analytics` | boolean | Whether analytics are enabled |

## Modifying Environment Configuration

To modify the environment configuration, edit the `envConfigs` object in `src/utils/env.ts`:

```typescript
const envConfigs: Record<Environment, EnvConfig> = {
  development: {
    // Development configuration
  },
  staging: {
    // Staging configuration
  },
  production: {
    // Production configuration
  }
};
``` 