# ProlinkliAngularCore

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### API Proxy

The development server is configured with a proxy that redirects `/api` requests to `localhost:8080/v1/api` to connect with the backend server. This is configured in `proxy.conf.json` and automatically active during development.

## Project Structure

This project follows a structured approach with three main directories:

```
src/app/
├── core/       # Non-business feature code (services, guards, interceptors, configs)
├── features/   # Business feature code (organized as internal modules)
└── shared/     # Code shared between features (common components, utilities)

projects/       # Publishable libraries with scoped package names
├── admin-dashboard/
├── [other-library]/
└── ...
```

### Creating Publishable Libraries

This project includes a custom schematic for creating libraries with proper scoping and `index.ts` entry files.

#### Using the Custom Schematic

```bash
# Create a feature library
ng generate pli-library feature-name

# Create a library in shared folder
ng generate pli-library @shared/types

# Create with custom prefix
ng generate pli-library @auth/services --prefix=auth
```

#### Alternative: Using npm script

```bash
# Create a feature library using the npm script
npm run create-feature --name=library-name
```

#### What the schematic does:

1. **Generates** a standard Angular library
2. **Renames** `public-api.ts` to `index.ts`
3. **Updates** `ng-package.json` to use `index.ts` as entry file
4. **Sets** scoped package name automatically

#### Examples:

```bash
# Creates src/app/features/dashboard/ with standard naming
ng generate pli-library dashboard

# Creates src/app/shared/types/ with @shared scope
ng generate pli-library @shared/types

# Creates src/app/features/auth/ with standard naming
ng generate pli-library auth
```

#### Building and Publishing:

```bash
# Build the library
ng build library-name

# Publish to npm (from dist directory)
cd dist/library-name
npm publish --access public
```

#### Usage in other projects:

```bash
# Install the package
npm install @pli-feature/library-name

# Import in your code
import { SomeComponent } from '@pli-feature/library-name';
```

Each library includes:
- Own `package.json` with scoped name
- Public API exports via `index.ts`
- TypeScript configuration
- Build and test setup

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
