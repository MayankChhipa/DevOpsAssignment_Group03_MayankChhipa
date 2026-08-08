# Playwright Components Overview

Based on the [official Playwright documentation](https://playwright.dev/docs/intro).

## What is Playwright?

Playwright is an **open-source browser automation and end-to-end testing framework** developed by Microsoft. It provides:

* APIs for automating modern browsers
* Built-in test runner and assertions
* Cross-browser testing with Chromium, Firefox, and WebKit
* Parallel test execution
* Automatic waiting and browser isolation
* Screenshots, videos, and trace-based debugging
* CI/CD integration

Playwright is designed primarily for **web application testing and browser automation**.

## Core terminology

| Term                | Meaning                                                                                |
| ------------------- | -------------------------------------------------------------------------------------- |
| **Playwright API**  | Commands used to control browsers, pages, locators, navigation, etc.                   |
| **Browser**         | Browser engine instance such as Chromium, Firefox, or WebKit                           |
| **Browser Context** | An isolated browser session with its own cookies, storage, and authentication state    |
| **Page**            | A browser tab/page on which actions and assertions are performed                       |
| **Locator**         | A mechanism for finding and interacting with elements reliably                         |
| **Playwright Test** | Built-in test runner providing assertions, fixtures, parallel execution, and reporting |

**Important:** Playwright Test combines browser automation with test execution and assertions. This is different from Selenium WebDriver, where a separate test framework such as JUnit or pytest is commonly used.

## Architecture (minimum setup)

```text
Test code (JavaScript/TypeScript/etc.)
    → Playwright Test / Playwright API
        → Browser
            → Browser Context
                → Page
                    → Web Application
```

Playwright communicates directly with the supported browser engines and manages browser sessions through its own automation layer.

## Playwright's main components

### 1. Playwright API

* Primary browser automation interface
* Supports JavaScript/TypeScript, Python, Java, and .NET
* Controls browser navigation, clicks, typing, uploads, dialogs, etc.
* Provides locators and web assertions
* Suitable for UI and E2E testing in CI/CD

### 2. Playwright Test

* Built-in test runner for Playwright
* Provides test execution and assertions
* Supports fixtures and reusable test setup
* Supports parallel test execution
* Provides retries, projects, and test configuration
* Generates test reports

Example:

```typescript
import { test, expect } from '@playwright/test';

test('login page loads', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});
```

### 3. Browser Contexts

Browser contexts provide **isolated environments** for tests.

```text
Browser
│
├── Context A → Test A
├── Context B → Test B
└── Context C → Test C
```

Each context can have separate:

* Cookies
* Local storage
* Authentication state
* Session information

This makes parallel and independent testing easier.

### 4. Playwright Browsers

Playwright supports three major browser engines:

| Engine       | Common browser |
| ------------ | -------------- |
| **Chromium** | Chrome / Edge  |
| **Firefox**  | Firefox        |
| **WebKit**   | Safari engine  |

The same test can therefore be executed against multiple browser engines using Playwright's project configuration.

### 5. Locators

Locators identify elements on a webpage.

Examples:

```typescript
page.getByRole('button', { name: 'Login' });
page.getByText('Welcome');
page.getByLabel('Username');
```

Playwright recommends user-facing and semantic locators where possible because they are generally more resilient to changes in page structure.

### 6. Trace Viewer

Playwright's **Trace Viewer** helps investigate failed tests.

A trace can contain information such as:

* Actions performed
* Screenshots
* DOM snapshots
* Network activity
* Console information

This is particularly useful when debugging failures in CI/CD where the browser may not be directly visible.

## Language and framework support

| Language                | Playwright option    | Typical CI example     |
| ----------------------- | -------------------- | ---------------------- |
| JavaScript / TypeScript | Playwright Test      | npm + GitHub Actions   |
| Python                  | Playwright + pytest  | pip + GitHub Actions   |
| Java                    | Playwright Java      | Maven/Gradle + Jenkins |
| C#                      | Microsoft.Playwright | dotnet + Azure DevOps  |

For our case study, **JavaScript/TypeScript + Playwright Test** is a natural choice because Playwright Test provides the runner, assertions, fixtures, reporting, and parallel execution in one ecosystem.

## Browser automation vs test runner

|                        | Playwright API                  | Playwright Test         |
| ---------------------- | ------------------------------- | ----------------------- |
| **Purpose**            | Browser automation              | Complete test execution |
| **Controls browser**   | Yes                             | Yes                     |
| **Assertions**         | Can be used with external tools | Built-in                |
| **Fixtures**           | No                              | Yes                     |
| **Parallel execution** | Application-dependent           | Built-in                |
| **Reports**            | External setup                  | Built-in reporters      |

## Selenium vs Playwright — terminology difference

Some Selenium concepts do not have direct Playwright equivalents.

| Selenium                   | Playwright                                                           |
| -------------------------- | -------------------------------------------------------------------- |
| WebDriver                  | Playwright API                                                       |
| ChromeDriver / GeckoDriver | Browser engines managed by Playwright                                |
| Selenium Grid              | Playwright's parallel workers / CI infrastructure                    |
| Selenium IDE               | No direct equivalent                                                 |
| Selenium Manager           | No direct equivalent needed for normal Playwright browser management |
| JUnit / pytest / TestNG    | Playwright Test for JS/TS                                            |

Playwright's architecture is more integrated, so browser management, test execution, isolation, assertions, tracing, and reporting can be handled within the Playwright ecosystem.

## Legacy / historical note

Playwright does not have a Selenium RC-style legacy component that needs to be discussed for modern usage.

For our case study, the important components are:

```text
Playwright
    │
    ├── Playwright API
    ├── Playwright Test
    ├── Browser Contexts
    ├── Locators
    ├── Chromium / Firefox / WebKit
    └── Trace Viewer
```

## Related files

* [01_Playwright_in_DevOps.md](./01_Playwright_in_DevOps.md) — Playwright's role in DevOps
* [02_Test_Types_and_Test_strategy.md](./02_Test_Types_and_Test_strategy.md) — Test strategy and Playwright's place in the pyramid
