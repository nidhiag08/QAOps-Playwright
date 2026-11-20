#Playwright Framework

TypeScript + Playwright framework using the Page Object Model, custom fixtures, data-driven tests and an API layer.

- UI targets: https://www.saucedemo.com, https://rahulshettyacademy.com
- API target: https://jsonplaceholder.typicode.com

## Structure

```
├── playwright.config.ts     # Browsers, reporters, retries, traces, env loading
├── .env.qa / .env.example   # Environment config (TEST_ENV=qa picks .env.qa)
├── src/
│   ├── pages/
│   │   ├── BasePage.ts      # Shared helpers for every page object
│   │   ├── saucedemo/       # LoginPage, InventoryPage, CartPage, CheckoutPage
│   │   └── rsa/             # Rahul Shetty Academy page objects for new RSA tests
│   ├── fixtures/            # Custom fixtures exposing every page object + loggedInPage, postsClient
│   ├── api/                 # API clients (PostsClient)
│   └── utils/               # Helpers (env reader, random data generator)
│       └── excel/           # ExcelUtils: read / write / update .xlsx files (exceljs)
├── test-data/               # JSON test data for data-driven tests
│   └── excel/               # .xlsx workbooks used by tests
├── tests/                   # One folder per application; files must end in .spec.ts / .spec.js
│   ├── saucedemo/ui/        # SauceDemo feature tests
│   ├── saucedemo/e2e/       # SauceDemo end-to-end journeys
│   ├── ui/                  # Rahul Shetty Academy tests (JS)
│   └── api/                 # API tests
└── .github/workflows/       # CI pipeline
```

### Conventions

- New tests should use page objects: add locators to `src/pages/<app>/` and expose the page as a fixture in `src/fixtures/baseFixture.ts`.
- URLs come from `.env.*` (`BASE_URL`, `RSA_URL`, `RSA_PRACTICE_URL`, ...); page objects open their own page with `open()`.
- Every test gets a tag: `@smoke`, `@regression`, `@e2e` or `@api`.
- Check results with `expect(...)` assertions, not `console.log`.

## Setup

```bash
npm install
npx playwright install
```

## Running tests

| Command | What it does |
|---|---|
| `npm test` | Chromium + API tests |
| `npm run test:all-browsers` | Chromium, Firefox, WebKit + API tests (what CI runs) |
| `npm run test:chromium` | UI tests in Chromium only |
| `npm run test:api` | API tests only |
| `npm run test:saucedemo` | SauceDemo tests only |
| `npm run test:rsa` | Rahul Shetty Academy tests only |
| `npm run test:smoke` | Tests tagged `@smoke` |
| `npm run test:regression` | Tests tagged `@regression` |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:debug` | Step through with the inspector |
| `npm run report` | Open the last HTML report |
| `npm run codegen` | Record locators/actions |
| `npm run typecheck` | TypeScript check |

Switch environment: `TEST_ENV=staging npm test` (loads `.env.staging`).
