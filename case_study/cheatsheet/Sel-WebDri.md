# Selenium WebDriver – Bing search

* Basic Working Steps
1. Import Selenium

- Import the Selenium WebDriver library into your program.

2. Create a Browser Driver

- Tell Selenium which browser you want to automate.

* Example:

* let driver = await new Builder()
    .forBrowser("MicrosoftEdge")
    .build();

- This creates a connection between your program and Microsoft Edge.

3. Open a Website
* await driver.get("https://www.bing.com");

- WebDriver opens Bing in the browser.

4. Find an Element

- WebDriver finds elements on the webpage using locators.

- Example:

* let searchBox = await driver.findElement(By.name("q"));

- Here, Selenium finds the Bing search box.

5. Perform an Action
* await searchBox.sendKeys("Selenium WebDriver", Key.RETURN);

- WebDriver enters the text and presses Enter.

6. Wait / Verify

- WebDriver can wait for a page or element to appear and can verify     whether the expected result occurred.

7. Close the Browser
* await driver.quit();

- This closes the browser and ends the WebDriver session.