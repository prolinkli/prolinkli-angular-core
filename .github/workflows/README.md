# GitHub Workflows for ProLinkLi Angular Core

This directory contains GitHub Actions workflows that ensure code quality and successful builds for every pull request.

## 🔄 Workflows Overview

### 🚀 Manual Triggers Available
All workflows can now be triggered manually from GitHub Actions:
1. Go to **Actions** tab in your GitHub repository
2. Select the workflow you want to run
3. Click **"Run workflow"** button
4. Optionally provide a reason for the run
5. Click **"Run workflow"** to start

### 1. CI Pipeline (`ci.yml`)
**Triggers:** Push to `main`/`develop` branches, Pull Requests, Manual
**Purpose:** Main build and test workflow

- ✅ Sets up Node.js 22.x (compatible with Angular 20)
- ✅ Installs dependencies using `npm ci`
- ✅ Runs linting (if configured)
- ✅ Executes unit tests with coverage
- ✅ Builds main application for production
- ✅ Builds all feature and shared libraries
- ✅ Uploads test coverage and build artifacts

### 2. Branch Protection (`branch-protection.yml`)
**Triggers:** Pull Requests to `main` branch, Manual
**Purpose:** Additional validation and security checks

- 🔍 TypeScript compilation validation
- 🔍 Library configuration validation
- 🔍 Large file detection
- 🔒 Security audit for dependencies
- 📦 Outdated package detection

### 3. SSR Validation (`ssr-validation.yml`)
**Triggers:** Pull Requests affecting source code or config files, Manual
**Purpose:** Validates Server-Side Rendering functionality

- 🏗️ Builds application with SSR enabled
- 🔍 Verifies SSR artifacts are generated
- 🚀 Tests SSR server startup and responsiveness
- 📊 Monitors bundle sizes
- 🔍 Validates prerendered pages

### 4. Dependabot (`../dependabot.yml`)
**Purpose:** Automated dependency management

- 📅 Weekly dependency updates on Mondays
- 🛡️ Ignores major Angular updates to prevent breaking changes
- 🏷️ Automatically labels and assigns PRs
- 🔄 Updates both npm packages and GitHub Actions

## 🛡️ Branch Protection Rules

To ensure these workflows provide effective protection, configure the following branch protection rules in your GitHub repository settings:

### For `main` branch:
1. **Require status checks to pass before merging**
   - ✅ `test-and-build`
   - ✅ `build-status`
   - ✅ `pr-validation`
   - ✅ `security-scan`
   - ✅ `ssr-build-test`

2. **Require up-to-date branches before merging**
3. **Require review from code owners**
4. **Dismiss stale reviews when new commits are pushed**
5. **Do not allow bypassing the above settings**

## 🚀 Node.js Version Strategy

All workflows use **Node.js 20.x** which is:
- ✅ Compatible with Angular 20
- ✅ LTS (Long Term Support)
- ✅ Provides optimal performance for Angular builds

## 📦 Library Build Strategy

The workflows build all libraries in your monorepo structure:

### Feature Libraries
- `@features/admin-dashboard`
- `@features/home`
- `@features/login`

### Shared Libraries
- `@shared/data-access`
- `@shared/layout`
- `@shared/pli-ui`
- `@shared/types`

Each library is built independently to catch build issues early.

## 🔧 Customization

### Adding New Libraries
When you add new libraries, update the CI workflow's "Build all libraries" step to include your new library:

```yaml
npx ng build @your-scope/new-library --configuration=production
```

### Adding Linting
If you add ESLint or other linting tools, they will automatically run via the `npm run lint` command.

### Custom Test Configuration
The workflows use ChromeHeadless for testing. Modify the test command in `ci.yml` if you need different browser configurations.

## 🐛 Troubleshooting

### Common Issues:

1. **Build fails for specific library**
   - Check the library's `ng-package.json` configuration
   - Verify all dependencies are properly declared

2. **SSR tests fail**
   - Ensure your components are SSR-compatible
   - Check for browser-only code that needs guards

3. **Tests timeout**
   - Increase timeout in the workflow if needed
   - Check for infinite loops or async issues in tests

## 📈 Workflow Status Badges

Add these badges to your main README to show workflow status:

```markdown
![CI Pipeline](https://github.com/your-username/prolinkli-angular-core/workflows/CI%20Pipeline/badge.svg)
![Branch Protection](https://github.com/your-username/prolinkli-angular-core/workflows/Branch%20Protection/badge.svg)
![SSR Validation](https://github.com/your-username/prolinkli-angular-core/workflows/SSR%20Validation/badge.svg)
```

---

These workflows ensure that every pull request meets quality standards before merging, helping maintain a stable and reliable codebase for your Angular 20 application. 🎯 