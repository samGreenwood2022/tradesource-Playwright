# Playwright Test Automation Framework
 
## What this project is
 
This repository is a hands-on Playwright test automation framework, built step
by step as part of a 1-to-1 test automation course. It automates a locally-run
practice website, TradeSource — starting from its homepage and navigating
through to a Vortix Manufacturer page via the search field.
 
The goal isn't just to end up with a working test suite, but to build one
the way a professional automation engineer would: with proper version
control, a CI pipeline from day one, a clean architecture, and tests that
go beyond the basics into real-world scenarios like negative testing and
accessibility checks.
 
## What we'll be building
 
Across the course, this project will grow to include:
 
- A small set of real tests against the practice site, using Playwright's own
  recommended locator strategy (role-based locators first, test ids where they
  help)
- A CI pipeline (GitHub Actions), wired up early so every test from this
  point on is automatically verified, with the HTML report and traces
  attached to every run
- A Page Object Model architecture, wired together with Playwright fixtures,
  plus custom fixtures for cross-cutting actions like accepting the cookie
  banner and logging in
- Pull requests and code review, including a first pass from an AI coding
  assistant before human review
- Visual regression testing, catching unintended layout and styling changes
- Accessibility testing with axe, plus manual Lighthouse audits
- API testing and network interception, forcing the site into edge-case and
  negative scenarios that are hard to reach through the UI alone
- BDD with Cucumber/Gherkin, turning existing tests into plain-English
  feature files
 
## Why this matters
 
By the end, this repo is meant to stand on its own — a genuine,
portfolio-ready example of a professional test automation framework, not
just a course exercise. Every commit from here on should read like it was
written with that in mind.
 
## Getting started
 
- Language: (JavaScript or TypeScript — confirmed in Session 1)
- Install dependencies: npm install
- Install the Playwright browsers: npx playwright install
- Start the TradeSource practice site in its own terminal: npm start (serves http://localhost:4321)
- Run the tests: npm test (or npm run test:ui for UI Mode)

## Running in CI

Tests run automatically on GitHub Actions (`.github/workflows/playwright.yml`)
on every push and pull request to `main`/`master`, and can be started manually.
The workflow checks out this repo and the TradeSource site repo, starts the
site, waits for it to respond, runs the tests and uploads the HTML report.

CI sets `BASE_URL=http://127.0.0.1:4321`, which overrides the `localhost`
default in `playwright.config.ts`. On the GitHub runners `localhost` can
resolve to IPv6 (`::1`) first, which makes the connection to the site fail,
so CI uses the IPv4 address instead. Locally you don't need to set anything.

## Visual regression tests

`tests/visual-regression.spec.ts` takes a full-page screenshot of the Vortix
manufacturer homepage with Playwright's built-in `toHaveScreenshot()` and
compares it with a saved baseline image.

Before the screenshot the test:

- switches off the cookie banner and "Discover TradeSource Insights" popup
  (`disablePopups()` sets the site's `tradesource_overlays=off` cookie before
  the page loads), as they appear at a random moment
- scrolls down the page one screen at a time and back to the top, then waits
  for every image to finish loading (`loadLazyImages()`), so lazy-loaded
  images are in the shot

Animations are disabled and up to 0.1% of pixels may differ
(`maxDiffPixelRatio: 0.001`), both set in `playwright.config.ts`.

### Where the baselines live

Screenshots differ slightly between operating systems and browsers (fonts,
anti-aliasing), so there is one baseline per OS and per browser project:

```
tests/visual-baselines/<platform>/<project>/<name>-baseline.png
e.g. tests/visual-baselines/linux/chromium/vortix-overview-baseline.png
```

Only the **Linux** baselines are committed, because those are what CI
compares against. Local Windows/macOS baselines are ignored by `.gitignore`
and just live on your machine.

Missing baselines are created automatically (`updateSnapshots: 'missing'`),
locally and on CI. The first run writes them, every later run compares.

### Regenerating baselines

When a page changes on purpose, rewrite its baselines:

```
npx playwright test tests/visual-regression.spec.ts --update-snapshots
```

Or delete the baseline file and run the tests again.

### Committing the Linux baselines

1. Push your branch. The first CI run creates the Linux baselines.
2. Open the workflow run on GitHub and download the `linux-visual-baselines`
   artifact.
3. Unzip it into `tests/visual-baselines/linux/` (so you end up with
   `tests/visual-baselines/linux/chromium/...` and `.../firefox/...`).
4. Commit and push them. From then on CI compares against them.

To refresh the Linux baselines after a deliberate change, delete the old files
in `tests/visual-baselines/linux/`, push, and repeat the steps above.

### When a visual test fails

Playwright saves three images in `test-results/`:

- `-expected`: the baseline
- `-actual`: what the page looks like now
- `-diff`: the differences highlighted in red

They are also shown in the HTML report (`npm run report`). On CI they are
uploaded as the `visual-diffs` artifact.
