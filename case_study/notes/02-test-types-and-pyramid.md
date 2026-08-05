# Test Types and Where Selenium Fits

## Common test types in DevOps

| Type | What it checks | Typical speed | Our tool? |
|------|----------------|---------------|-----------|
| Unit | Single function/class | Very fast | Teammates |
| Integration | Services, API + DB | Medium | Teammates / API tools |
| **E2E / UI** | Full flows in browser | Slow | **Selenium** |
| Performance | Load, throughput | Medium–slow | Teammates |
| Smoke | Critical paths after deploy | Fast subset | **Selenium (subset)** |
| Regression | Existing features still work | Varies | **Selenium** |

## The test pyramid (and Selenium's place)

```
        /\
       /  \     E2E / UI (fewer tests — Selenium)
      /----\
     /      \   Integration (some)
    /--------\
   /          \ Unit (many — teammates)
  /------------\
```

**Bottom:** Many fast unit tests — run on every commit.  
**Middle:** Integration / API tests.  
**Top:** Fewer E2E UI tests — **Selenium** — expensive but high confidence for user journeys.

Selenium belongs at the **top of the pyramid**: fewer tests, run less often than unit tests, but they validate real user behaviour.

## What Selenium is good at

- Login, checkout, search, form submission flows
- Verifying page content, URLs, and visible elements
- Cross-browser compatibility (with Grid or cloud providers)
- Visual regression when combined with screenshot comparison tools

## What Selenium is not for

- Testing isolated business logic in code (unit tests — teammates)
- Load testing thousands of concurrent users (JMeter etc. — teammates)
- Native mobile apps (use Appium for mobile; Selenium targets **web** and mobile **browsers**)

## Smoke vs full regression (Selenium)

| Suite | Size | When to run | Purpose |
|-------|------|-------------|---------|
| **Smoke** | 5–15 critical tests | Every PR / every deploy | Fast feedback |
| **Regression** | Full UI suite | Nightly or pre-release | Broad coverage |

Example smoke tests: app loads, user can log in, main dashboard visible.  
Example regression: all forms, edge cases, multi-step workflows.

## Cross-browser testing

Users use Chrome, Firefox, Edge, Safari. Selenium + **Grid 4** or CI **matrix builds** run the same tests on multiple browsers in parallel.

## When to run Selenium in the pipeline

| Trigger | Typical Selenium scope |
|---------|------------------------|
| PR / commit | Smoke suite (headless, parallel) |
| Merge to main | Smoke + selected regression |
| Deploy to staging | Full regression + cross-browser |
| Nightly | Full suite on Grid |

## Naming convention (good habit)

- `testLoginWithValidCredentials_redirectsToDashboard`
- `testCheckout_emptyCart_showsErrorMessage`

Clear names make CI failure logs readable without opening the test file.
