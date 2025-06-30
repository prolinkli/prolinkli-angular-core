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

### Creating Publishable Feature Libraries

To create publishable feature libraries with scoped package names:

```bash
# Create a library (gets its own package.json)
ng generate library [package-name] --prefix=[your-prefix]

# Example: Create an admin dashboard library
ng generate library admin-dashboard --prefix=pli
```

**Update the package.json** to use scoped naming:
```json
{
  "name": "@prolinkli-feature/admin-dashboard"
}
```

**Build and publish:**
```bash
# Build the library
ng build admin-dashboard

# Publish to npm (from dist directory)
cd dist/admin-dashboard
npm publish --access public
```

**Usage in other projects:**
```bash
# Install the package
npm install @prolinkli-feature/admin-dashboard

# Import in your code
import { AdminDashboardComponent } from '@prolinkli-feature/admin-dashboard';
```

Each library includes:
- Own `package.json` with scoped name
- Public API exports via `public-api.ts`
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
