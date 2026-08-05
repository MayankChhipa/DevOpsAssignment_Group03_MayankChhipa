# Testing in DevOps — Selenium Study Notes

Notes for our DevOps assignment case study. **Our topic is Selenium** — automated browser (UI / E2E) testing in CI/CD pipelines.

Other testing tools (e.g. unit testing, performance testing) are covered by teammates; these notes mention where Selenium fits in the overall pipeline but do not go into those tools in detail.

## Folder structure

| File | Topic |
|------|--------|
| [01-testing-in-devops.md](./01-testing-in-devops.md) | Why automated testing matters in DevOps; Selenium's role |
| [02-test-types-and-pyramid.md](./02-test-types-and-pyramid.md) | Test types; where UI/E2E and Selenium sit in the pyramid |
| [03-selenium-components.md](./03-selenium-components.md) | Selenium suite: IDE, WebDriver, Grid, Selenium Manager |
| [04-selenium-webdriver-pom.md](./04-selenium-webdriver-pom.md) | WebDriver, locators, waits, Page Object Model |
| [05-selenium-grid.md](./05-selenium-grid.md) | Selenium Grid 4 — parallel and cross-browser runs |
| [06-ci-cd-selenium.md](./06-ci-cd-selenium.md) | Running Selenium in Jenkins, GitHub Actions, Docker |
| [07-best-practices.md](./07-best-practices.md) | Checklist and common mistakes for Selenium in DevOps |

## How we use this folder

- **README** = table of contents and quick overview.
- **Separate `.md` files** = detailed notes per topic — easier to update each week and to use in the assignment and presentation.

## Official references

- [Selenium documentation](https://www.selenium.dev/documentation/)
- [Selenium components overview](https://www.selenium.dev/documentation/overview/components/)
- [Page Object Model (official)](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)
- [Waiting strategies (official)](https://www.selenium.dev/documentation/webdriver/waits/)
