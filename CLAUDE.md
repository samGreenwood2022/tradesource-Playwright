# Tradesource Playwright

Playwright test automation framework in TypeScript for regression testing Tradesource.
The framework is being built step by step, following the user's own Playwright course document.
Add to this file as the course progresses.

## Working approach
- Follow the course step by step. Don't jump ahead or scaffold things the course hasn't covered yet.
- Keep this file up to date as new structure, conventions and commands are added.

## Current state
- Playwright (`@playwright/test`) installed, TypeScript via `tsconfig.json`.
- `playwright.config.ts`: `testDir: ./tests`, `baseURL: http://localhost:4321`, HTML reporter, chromium/firefox/webkit projects.
- App under test runs locally at `http://localhost:4321` (must be started separately; no `webServer` config yet).
- Course progress:
  1. `tests/first-flat-test.spec.ts`: unoptimised flat spec. Every test repeats the full navigation to the Vortix manufacturer page (deliberately duplicated).
  2. `tests/optimised-flat-test.spec.ts`: same checks with duplication removed. Navigation moved into `test.beforeEach`, leaving 5 tests (h1, tagline, telephone link, website link, contact manufacturer button).
  3. **Next:** migrate the 5 optimised tests to the Page Object Model. No design pattern is used yet; that's intentional.
- `tests/example.spec.ts` is the default Playwright example (targets playwright.dev).

## Commands
- `npm test`: run all tests (`playwright test`)
- `npm run test:ui`: run in UI mode
- `npm run report`: open the HTML report
- `npm run codeGen`: launch codegen against `http://localhost:4321`

## Project structure
```
playwright.config.ts
tsconfig.json
tests/
  example.spec.ts
  first-flat-test.spec.ts
  optimised-flat-test.spec.ts
```

## Conventions
- Prefer user-facing locators (`getByRole`, then `getByTestId`).
- Use web-first assertions (`await expect(locator)...`, `await expect(page).toHaveURL/toHaveTitle`) rather than reading values and asserting on them.
- Shared setup goes in `test.beforeEach`.
