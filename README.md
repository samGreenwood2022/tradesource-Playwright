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
