# Testing in DevOps — Selenium's Role

## What is DevOps testing?

In DevOps, testing is **automated, continuous, and embedded in the pipeline**. Every code change is validated before it reaches production — not in a separate manual QA phase at the end.

Goals:

- Catch bugs early (shift-left where possible)
- Prevent regressions on every release
- Give fast feedback to developers and QA
- Block bad builds from deploying
- Validate the app the way users experience it (browser UI)

## Where Selenium fits

A full DevOps test strategy uses **multiple layers**. Teammates may cover unit tests, API tests, or performance tests; **our focus is Selenium** for:

- **UI / functional testing** — buttons, forms, navigation, login flows
- **End-to-end (E2E) testing** — full user journeys through the browser
- **Cross-browser testing** — Chrome, Firefox, Edge, Safari
- **Regression testing** — critical flows still work after each change

Selenium drives a **real browser** via the W3C WebDriver protocol. It answers: *"Does the application work correctly from the user's perspective in the browser?"*

## Shift-left vs shift-right for UI tests

| Layer | Typical tool (team) | When it runs |
|-------|---------------------|--------------|
| Unit / component | JUnit, pytest, etc. (teammates) | Every commit — fastest |
| API / integration | Postman, REST Assured, etc. | CI on merge |
| **UI / E2E** | **Selenium (us)** | CI (smoke) or staging (full suite) |
| Performance / load | JMeter, k6, etc. (teammates) | Staging / scheduled |

UI tests are **slower and more fragile** than unit tests, so teams often run a **small smoke suite** on every PR and a **full regression suite** nightly or before release — still fully automated in CI/CD.

## The feedback loop

```
Code change → Build → Deploy to test env → Selenium tests → Report → Fix or promote
```

If Selenium tests fail, the pipeline should **fail the build** or block promotion — a **quality gate**.

## Testing vs monitoring

![Testing vs Monitoring](../images/testing-vs-monitoring.svg)

| Testing (Selenium) | Monitoring |
|--------------------|------------|
| Runs before/during release in controlled env | Runs in production |
| Validates expected UI behaviour | Detects real-user issues |
| Automated in CI/CD | Alerts, logs, APM |

Both are needed: Selenium catches UI regressions before release; monitoring catches what tests missed in prod.

## Why automate UI tests?

Manual regression across browsers does not scale with frequent deployments. Selenium:

- Runs the same steps repeatedly and consistently
- Integrates with Jenkins, GitHub Actions, GitLab CI, Azure DevOps
- Scales with **Selenium Grid** and Docker for parallel cross-browser runs
- Produces reports and screenshots for CI artifacts

## Key takeaway for our case study

Selenium is the **browser automation layer** in DevOps — it validates user-facing behaviour in CI/CD, complements other test types owned by the team, and supports continuous delivery with automated UI regression.

# Where JUnit Fits in a DevOps Test Strategy

A full DevOps test strategy uses multiple layers. While teammates may cover UI tests (Selenium), API tests, or performance tests, our core focus is **JUnit** for the following:

*   **Unit Testing:** Testing individual methods, functions, and classes in complete isolation (often using mocks).
*   **Integration Testing:** Verifying that different components (like a service and a database) work together correctly.
*   **Code Coverage:** Pairing with tools like JaCoCo to ensure a high percentage of the codebase is actually tested.
*   **Build Validation:** Failing the build immediately if the core logic is broken.

> **The Core Purpose:**
> JUnit executes Java code directly. It answers the fundamental question: *"Does this specific piece of code do exactly what the developer intended at a foundational level?"*

---

## Shift-Left vs. Shift-Right Testing

| Layer | Typical Tool (Team) | When it Runs |
| :--- | :--- | :--- |
| **Unit / Component** | **JUnit (us)** | Every commit / PR build — *fastest* |
| **API / Integration** | Postman, REST Assured | CI on merge |
| **UI / E2E** | Selenium (teammates) | CI (smoke) or staging (full suite) |
| **Performance / Load** | JMeter, k6, etc. | Staging / scheduled |

---

## The Ultimate "Shift-Left" Tool

JUnit is the ultimate **"shift-left"** tool. Because unit tests run in milliseconds without needing a fully deployed environment or a browser, they form the massive foundation of the **"Test Pyramid."** 

They run constantly—often locally on the developer's machine *before* they even push the code.

---

## The Feedback Loop

![DevOps Feedback Loop](../images/feedback-loop.svg)

**Code change → Compile → JUnit tests → Build Application (JAR/WAR) → Deploy → UI tests**

If JUnit tests fail, the pipeline halts immediately before any deployment happens. It is the very first quality gate in the CI/CD process.

---
# Testing in DevOps — Playwright's Role

## What is DevOps testing?

In DevOps, testing is **automated, continuous, and integrated into the delivery pipeline** rather than being a final step before release.

Goals:

* Catch bugs early
* Prevent regressions
* Give fast feedback
* Block bad builds
* Validate the application from the user's perspective

A simplified flow is:

```text
Code → Build → Test → Deploy → Verify → Release
```

## Where Playwright fits

A DevOps strategy uses multiple testing layers. Teammates may handle unit, API, integration, or performance testing; **our focus is Playwright** for:

* **UI / functional testing** — buttons, forms, navigation, login
* **E2E testing** — complete user journeys
* **Smoke testing** — critical paths
* **Regression testing** — existing features after changes
* **Cross-browser testing** — Chromium, Firefox, WebKit

Playwright answers:

> **"Does the application work correctly from the user's perspective in the browser?"**

## Why Playwright?

Unlike basic browser automation, Playwright provides several built-in capabilities that make modern UI testing easier.

### Auto-waiting

Playwright automatically waits for many required conditions before performing actions.

```javascript
await page.getByRole('button', { name: 'Login' }).click();
```

This reduces the need for arbitrary delays such as `waitForTimeout()` and helps make tests more reliable.

### Browser Contexts

Tests can run in isolated browser contexts:

```text
Browser
├── Context A → User/Test A
├── Context B → User/Test B
└── Context C → User/Test C
```

Each context can have separate cookies, storage, and authentication state, making independent and parallel testing easier.

## The feedback loop

```text
Code change
     ↓
   Build
     ↓
Test Environment
     ↓
Playwright Tests
     ↓
   Report
   ↙     ↘
PASS     FAIL
 ↓         ↓
Continue   Fix
```

If critical Playwright tests fail, they can act as a **quality gate** and prevent the pipeline from continuing.

## CI/CD Integration

Playwright can run automatically with CI/CD platforms such as:

* GitHub Actions
* Jenkins
* GitLab CI
* Azure DevOps

A common strategy is to run a **small smoke suite on every PR** and a **larger regression suite on staging, nightly, or before release**.

## Debugging failed tests

Playwright can provide:

* Screenshots
* Video recordings
* Trace Viewer
* Test reports
* Browser and network information

This helps the team understand **why** a test failed instead of only seeing `TEST FAILED`.

## Parallel & Cross-Browser Testing

Playwright supports parallel execution to reduce test-suite execution time.

It can also run the same scenarios across:

```text
        Playwright
       /    |     \
 Chromium Firefox WebKit
```

This helps detect browser-specific issues before users encounter them.

## Testing vs Monitoring

| Testing                      | Monitoring                |
| ---------------------------- | ------------------------- |
| Before/during release        | Production                |
| Validates expected behaviour | Detects real-world issues |
| CI/CD automation             | Logs, alerts, APM         |

Both are important: **Playwright catches UI problems before release, while monitoring detects issues that occur in production.**

## Key takeaway for our case study

Playwright is the **browser automation layer** in our DevOps strategy.

It combines **browser automation, auto-waiting, isolated contexts, parallel execution, cross-browser testing, debugging, and CI/CD integration** to make automated UI testing more reliable.

> **The goal is not just to automate clicks — it is to continuously verify real user journeys before they reach production.**
