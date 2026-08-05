# JUnit 5 & Maven Setup Notes

## 📌 1. Core Testing Concepts

### What is JUnit?
* **JUnit 5** (JUnit Jupiter) is the standard testing framework for Java used to write automated **unit tests**.
* **Goal:** Verify that individual methods and classes work as expected before deploying code to production.

### Essential Annotations
| Annotation | Purpose |
| :--- | :--- |
| `@Test` | Marks a method as a test case. |
| `@BeforeEach` | Executes before **each** individual test method (used to reset test state/objects). |
| `@DisplayName("...")` | Assigns a human-readable title to the test in test runners and reports. |

### Common Assertions
* `assertEquals(expected, actual)`: Verifies that the expected value matches the actual result.
* `assertThrows(ExceptionClass.class, () -> executable)`: Verifies that specific code throws an expected exception (e.g., handling invalid inputs or locked accounts).
* `assertTrue(condition)`: Verifies that a given boolean condition evaluates to `true`.
* `assertNull(object)`: Verifies that an object reference is `null`.

---

## 📦 2. Role of Apache Maven

* **Dependency Management:** Automatically downloads libraries like JUnit 5 declared in `pom.xml`.
* **Standard Directory Structure:**
  ```text
  project-root/
  ├── pom.xml                 # Build configuration & dependencies
  └── src/
      ├── main/java/          # Application source code
      └── test/java/          # Unit test code