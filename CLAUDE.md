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
- WebKit is temporarily disabled everywhere (project commented out in `playwright.config.ts`). Locally it crashes on `newPage` ("Target page, context or browser has been closed"), suspected Windows Defender, and it was also failing in CI. Uncomment the project once both are resolved.
- App under test runs locally at `http://localhost:4321` (must be started separately; no `webServer` config yet).
- `baseURL` can be overridden with the `BASE_URL` env var (`process.env.BASE_URL ?? 'http://localhost:4321'`). CI (`.github/workflows/playwright.yml`) sets it to `http://127.0.0.1:4321` because `localhost` can resolve to IPv6 (`::1`) first on the GitHub runners and the connection fails.
- Sign-in is shared via a setup project (`tests/auth.setup.ts`, project `setup`). chromium/firefox depend on it and load `playwright/.auth/user.json` (gitignored) as `storageState`. The setup reuses the saved session if the "Open user menu" button shows, otherwise signs in through `SignInPage.signIn()` and rewrites the file. The app stores sign-in in localStorage, not cookies.
- Tests run signed in by default. Signed-out tests (05/06 in `page-object-model-test.spec.ts`) sit in their own `describe('signed out')`.
- Accessibility: `utils/accessibility.ts` exports `runAccessibilityScan(page, testInfo, reportName)`, which runs the axe scan, attaches the JSON and HTML reports, saves the HTML and adds violation annotations. Specs call it and keep their own assertions. `@axe-core/playwright` scans the Vortix page (signed out) in `page-object-model-test.spec.ts` against WCAG 2.0, 2.1 and 2.2 A/AA tags. Violations are expected (training site, not being fixed), so the test does not fail on them: it reports them as annotations plus the HTML report, and only asserts the scan ran. CI uploads `accessibility-report/` as its own artifact. Known violation: the locale button shows "UK" but its aria-label is "Choose location and language" (`label-content-name-mismatch`, WCAG 2.5.3). `axe-html-reporter` turns the results into a readable HTML report, attached to the Playwright report as `accessibility-report` and saved to `accessibility-report/vortix-<project>.html` (gitignored).
- Latest completed stage: 3 (Page Object Model). Next stage: not yet confirmed, check the course document.
- The default `tests/example.spec.ts` was removed in stage 3.
- Popups (cookie banner, "Discover TradeSource Insights" dialog) are dismissed by the `acceptCookies` and `closeDialog` auto fixtures in `fixtures/test-options.ts` (`page.addLocatorHandler`), added in course Session 6. Specs must not click these popups themselves, or the handler and the spec race for the same button. The close handler is scoped to that dialog because the "Sign in required" modal also has a "Close dialog" button.

## Course log
A running record of each stage. Append a new entry when a stage is completed; don't overwrite earlier ones.

1. **Unoptimised flat spec** (done)
   - `tests/first-flat-test.spec.ts`: every test repeats the full navigation to the Vortix manufacturer page (deliberately duplicated).
CI (GitHub Actions) was added alongside the early flat specs (commit `0b92c3e`); the stage number isn't recorded here.
   - `.github/workflows/playwright.yml`: checks out this repo and the `samGreenwood2022/tradesource-site` repo, starts the site, waits for it to answer, runs `npx playwright test` and uploads the HTML report.
   - `BASE_URL` set to `http://127.0.0.1:4321` in the workflow, overriding the `localhost` default in `playwright.config.ts` (IPv6 resolution issue on the runners).

2. **Optimised flat spec** (done)
   - `tests/optimised-flat-test.spec.ts`: same checks with the duplication removed. Navigation moved into `test.beforeEach`, leaving 5 tests (h1, tagline, telephone link, website link, contact manufacturer button).
3. **Page Object Model** (done)
   - `pages/`: `BasePage` holds shared locators and actions (cookies, dialog, homepage navigation). `TradeSourceHomePage`, `SearchResultsPage` and `ManufacturerHomePage` extend it. Assertions stay in the specs.
   - `fixtures/test-options.ts`: extends Playwright's `test` so each page object is injected as a fixture. Specs import `test` and `expect` from here.
   - `tests/page-object-model-test.spec.ts`: the 5 optimised tests migrated to use the page objects, plus a check that Contact manufacturer opens the "Sign in required" modal.
   - Comments made consistent across all pages, fixtures and specs (path header, class description, identical LOCATORS/METHODS banners).
   - `tests/example.spec.ts` removed.

## Commands
- `npm test`: run all tests (`playwright test`)
- `npm run test:ui`: run in UI mode
- `npm run report`: open the HTML report
- `npm run codeGen`: launch codegen against `http://localhost:4321`

## Project structure
```
playwright.config.ts
tsconfig.json
pages/
  base-page.ts
  manufacturer-home-page.ts
  search-results-page.ts
  sign-in-page.ts
  tradesource-home-page.ts
utils/
  accessibility.ts
fixtures/
  test-options.ts
playwright/.auth/
  user.json          (saved sign-in session, gitignored)
tests/
  auth.setup.ts
  first-flat-test.spec.ts
  optimised-flat-test.spec.ts
  page-object-model-test.spec.ts
```

## Conventions
- Prefer user-facing locators (`getByRole`, then `getByTestId`).
- Use web-first assertions (`await expect(locator)...`, `await expect(page).toHaveURL/toHaveTitle`) rather than reading values and asserting on them.
- Shared setup goes in `test.beforeEach`.
- Tests that need a signed-out user opt out of the saved session in their own `describe` (`test.use({ storageState: { cookies: [], origins: [] } })`).
- Page objects extend `BasePage`, expose locators as `readonly` properties, and contain actions only. Assertions go in the spec files.
- Formatting: Prettier via `.prettierrc` (`printWidth: 120`, `singleQuote: true`).
- Shared helpers that aren't page objects (e.g. accessibility scanning) go in `utils/`.
- Comments: lowercase, one per method, a `// path/to/file.ts` header on every file, and the standard LOCATORS / METHODS banners in page objects.
