# Selenium IDE-Bing Search 

* A quick guide for first-time users to create and run a basic Bing Search automation test using Selenium IDE in Microsoft Edge.

1. What We Need
- Microsoft Edge
- Selenium IDE browser extension
- Internet connection

* Install Selenium IDE from the Edge Add-ons store.

2. Create a New Project
- Open Selenium IDE in Microsoft Edge.
- Select Create a new project.
- Enter a project name:
- Bing Search Test
- Set the Base URL: https://www.bing.com
- Create the project.

3. Start Recording
- Click Record.

- Selenium IDE will open the Base URL in a browser window and start recording your actions.

- Perform the following actions:

* Open Bing.
* Click the search box.
* Type: "Selenium WebDriver"
* Press Enter.
* Wait for the search results to appear.
* Stop the recording.

- Selenium IDE automatically converts your actions into test steps.

4. Recorded Test

- Your test should contain steps similar to:

Open Bing
      ↓
Click Search Box
      ↓
Type "Selenium WebDriver"
      ↓
Press Enter
      ↓
Display Search Results

- You can select individual steps in Selenium IDE to view or edit their commands, targets, and values.

5. Run the Test

- Before running:

* Close any unnecessary browser windows.
* Make sure the test is selected in Selenium IDE.
* Click Run Test.

- Selenium IDE will automatically:

Open Bing
   ↓
Find Search Box
   ↓
Enter "Selenium WebDriver"
   ↓
Press Enter
   ↓
Show Search Results

- We do not need to perform these actions manually.

6. Expected Result
- The test should successfully search Bing for:
- "Selenium WebDriver" and display the corresponding search results.

