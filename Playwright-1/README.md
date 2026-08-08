# Playwright

## Playwright Installation

Node.js was installed and verified using `node -v`. Playwright was then initialized using `npm init playwright@latest`.

The project was configured with JavaScript, with tests stored in the `tests` folder, and Playwright browsers were installed successfully.

## 2. Example – Calculator Testing

A practical example of Playwright automation was implemented using a local calculator application. The test script launches the browser, opens the calculator, performs user actions, and verifies the displayed results.

### Test Cases

**Test Case 1 – Addition**
- Enters `7 + 5`
- Clicks the equals button
- Verifies that the displayed result is `12`

**Test Case 2 – Delete Functionality**
- Enters `98`
- Uses the delete button to remove the last digit
- Verifies that the displayed result becomes `9`

**Test Case 3 – Clear and Recalculate**
- Enters `6 × 7`
- Clears the current input
- Enters `4 + 3`
- Clicks the equals button
- Verifies that the displayed result is `7`

### Automation Approach

The script uses Playwright's browser automation capabilities to interact with calculator buttons and verify results. A reusable `clickSequence` function is used to perform button-click sequences, while locators are used to identify calculator elements and retrieve the displayed results. :contentReference[oaicite:0]{index=0}

The browser is launched in non-headless mode, and the calculator application is opened from the local server before executing the test cases. :contentReference[oaicite:1]{index=1}

All three test cases print their actual results and compare them with the expected values: `12`, `9`, and `7`. :contentReference[oaicite:2]{index=2}