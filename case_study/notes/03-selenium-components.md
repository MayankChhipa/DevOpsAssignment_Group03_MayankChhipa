# Selenium Components Overview

Based on the [official Selenium documentation](https://www.selenium.dev/documentation/overview/components/).

## What is Selenium?

Selenium is an **open-source browser automation project**. It provides:

- An API to control browsers (WebDriver)
- Tools to record and replay tests (IDE)
- Infrastructure to run tests at scale (Grid)
- Automated driver management (Selenium Manager)

It implements the **W3C WebDriver specification** so the same test code can target major browsers interchangeably.

## Core terminology

| Term | Meaning |
|------|---------|
| **API** | Commands used to control the browser (click, type, navigate) |
| **Language bindings** | Libraries for Java, Python, C#, JavaScript, Ruby, etc. |
| **Driver** | Browser-specific executable (ChromeDriver, GeckoDriver, EdgeDriver) |
| **Framework** | Test runner that executes Selenium tests (JUnit, TestNG, pytest, NUnit) |

**Important:** WebDriver only **talks to the browser**. It does not assert pass/fail or generate reports — that is the job of your **test framework** (e.g. JUnit + AssertJ, TestNG, pytest).

## Architecture (minimum setup)

```
Test code (Java/Python/etc.)
    → Language bindings (Selenium library)
        → WebDriver API
            → Browser driver (ChromeDriver, etc.)
                → Browser (Chrome, Firefox, …)
```

Remote execution adds **Selenium Grid** or **RemoteWebDriver** between the test and the browser.

## Selenium suite — four main parts

### 1. Selenium WebDriver (primary tool for us)

- Drives a **real browser** natively
- Write tests in Java, Python, C#, JavaScript, Ruby, Kotlin
- Used for **production** automated UI and E2E tests in CI/CD
- Modern browsers expose a WebDriver endpoint; Selenium bindings send commands to it

### 2. Selenium IDE

- Browser **plugin** (Chrome / Firefox)
- Record-and-playback for quick prototyping
- Exports scripts to code (Java, Python, C#, etc.)
- **Use case:** Explore locators and flows → export → refactor into WebDriver + Page Objects
- Not typically used as the main CI runner for large suites

### 3. Selenium Grid 4

- Distributes tests across **multiple machines, browsers, and OS versions**
- Enables **parallel** execution — reduces total run time
- Hub/Router routes sessions to browser **Nodes**
- Essential for cross-browser CI at scale (often with Docker)
- See [05-selenium-grid.md](./05-selenium-grid.md)

### 4. Selenium Manager

- Built-in **automatic driver and browser management** (Rust-based CLI)
- Selenium bindings use it by default — no manual ChromeDriver download in many setups
- Aligns driver version with installed browser version
- Reduces "wrong driver version" failures in local and CI environments

## Selenium RC (legacy)

**Selenium Remote Control (RC)** is deprecated. Modern projects use **WebDriver** only. Mention RC only historically in presentations.

## Language and framework pairing (common in DevOps)

| Language | Common test framework | CI example |
|----------|----------------------|------------|
| Java | JUnit 5, TestNG | Maven/Gradle + Jenkins |
| Python | pytest | pip + GitHub Actions |
| C# | NUnit, xUnit | dotnet test + Azure DevOps |
| JavaScript | Mocha, Jest | npm + GitHub Actions |

Our case study can use **Java + TestNG/JUnit** or **Python + pytest** — both are standard with Selenium in pipelines.

## WebDriver vs Grid (short comparison)

| | WebDriver | Grid |
|---|-----------|------|
| **Scope** | One browser session per driver | Many sessions across nodes |
| **Use** | Local dev, small CI jobs | Parallel + cross-browser at scale |
| **Speed** | One test at a time per driver | Many tests in parallel |

## Related files

- [04-selenium-webdriver-pom.md](./04-selenium-webdriver-pom.md) — writing tests
- [05-selenium-grid.md](./05-selenium-grid.md) — scaling in CI
- [06-ci-cd-selenium.md](./06-ci-cd-selenium.md) — pipeline integration
