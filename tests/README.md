# BotBrowser-tests

Based on the [playwright test](https://playwright.dev/docs/writing-tests), this repository demonstrates the testing capabilities of BotBrowser.

---

## Getting Started

### Step 1: Set Up the Environment

1. **Create a `.env` File**:
   Add the following configurations to the `.env` file in the root directory of the project:

    ```bash
    BROWSER_EXECUTABLE_PATH=/path/to/botbrowser/executable
    BOT_PROFILE_PATH=/path/to/bot/profile.enc
    ```

2. **Example Configuration**:

    ```bash
    BROWSER_EXECUTABLE_PATH=/usr/local/bin/chromium
    BOT_PROFILE_PATH=/home/user/bot_profiles/chrome131_win11_x64.enc
    ```

3. Ensure the paths are correctly set for your environment. The `BROWSER_EXECUTABLE_PATH` points to the BotBrowser executable, and `BOT_PROFILE_PATH` points to a valid BotBrowser profile.

---

### Step 2: Run the Tests

After configuring the `.env` file, you can execute the tests using the Playwright test runner. Follow these steps:

1. Install the required dependencies:

    ```bash
    npm install
    ```

    ***

2. Run the tests:

    ```bash
    npx playwright test
    ```

3. View the test results:
   The results will be displayed directly in the terminal. You can also generate a detailed HTML report with:
    ```bash
    npx playwright show-report
    ```

---

## Important Notes

1. **Demonstration Purpose Only**:
   These tests are provided **exclusively for demonstration purposes** to showcase the capabilities of BotBrowser. They serve as proof-of-concept and should not be used for any illegal or unethical purposes.

2. **No Responsibility Assumed**:
   This project does not assume responsibility for any misuse of the provided tests. Users must ensure they comply with applicable laws and terms of service.

---

For further assistance, refer to the [Playwright documentation](https://playwright.dev/docs/writing-tests).
