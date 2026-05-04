# test_automation

Test automation utilities using [Playwright](https://playwright.dev/).

This repo currently contains:

- **Playwright Test (Node.js)** setup via `@playwright/test` and `playwright.config.js` (expects tests under `./tests`)
- **A Python runner** (`test_automation.py`) that reads test data from an Excel sheet, drives a browser with Playwright, and writes results back to Excel
- **GitHub Actions CI** workflow that runs Playwright tests and uploads the HTML report

## Prerequisites

- Node.js (LTS recommended)
- Python 3.10+ (recommended for `test_automation.py`)

## Install (Node / Playwright Test)

```bash
npm ci
npx playwright install --with-deps
```

## Run Playwright tests (Node)

This project uses Playwright Test, but `package.json` does not define any `npm run` scripts yet. You can run directly with `npx`:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

### Where do tests go?

`playwright.config.js` is configured with:

- `testDir: './tests'`

Create a `tests/` folder and add spec files such as `tests/example.spec.js` (or `.ts`) to start using Playwright Test.

## Run the Excel-driven UI automation (Python)

`test_automation.py` automates a frontend UI and writes **Actual output** and **Status** back into an Excel file.

### Install (Python)

Install dependencies (minimum required based on the script):

```bash
pip install playwright openpyxl
python -m playwright install
```

### Basic run

```bash
python test_automation.py
```

### Common options

```bash
python test_automation.py --excel "path/to/Assignment 1 - Test cases.xlsx" --sheet " Test cases"
```

Useful flags:

- `--url`: target frontend URL (default: `https://www.pixelssuite.com/chat-translator`)
- `--headless`: run without opening a visible browser
- `--output`: save results to a different Excel file (defaults to updating the input file)
- `--wait-ms`: wait after clicking/typing before reading output
- `--retries` / `--retry-wait-ms`: retry output reads until it updates
- `--type-delay-ms`: typing delay (helps with flaky UIs)
- `--timeout-ms`: Playwright default timeout
- `--keep-open`: keep the browser open after running (only useful in headed mode)

Environment variables:

- `FRONTEND_URL`: alternative way to set the target URL

## CI (GitHub Actions)

Workflow: `.github/workflows/playwright.yml`

On pushes/PRs to `main`/`master`, it:

- installs Node deps (`npm ci`)
- installs Playwright browsers
- runs `npx playwright test`
- uploads `playwright-report/` as an artifact

## Troubleshooting

- **No tests found (Node)**: create `tests/` and add at least one `*.spec.*` file.
- **Playwright browsers missing**: run `npx playwright install --with-deps` (Node) or `python -m playwright install` (Python).
- **Excel sheet name issues**: note the default sheet name in the script is `" Test cases"` (leading space). Pass `--sheet` if your workbook differs.

