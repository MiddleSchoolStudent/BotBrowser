
# 🚀 BotBrowser-tests

> 📢 Showcase how BotBrowser powers real-world automation tests with [Playwright](https://playwright.dev/docs/writing-tests).

All tests in this repo run under **Sticky Rotating Residential IPs** to mimic genuine user behavior.
If you’re blocked when using data-center proxies, switch to **Sticky Rotating Residential IPs**.

---

⚠️ **DISCLAIMER**

These test scripts are provided for **educational purposes** and to **demonstrate** the capabilities of BotBrowser. They are intended solely for **legal use cases** that comply with all applicable laws and regulations. **Any misuse**—such as violating website terms of service or engaging in unlawful activities—**is strictly prohibited.**

---

## 🔧 Getting Started

### 1. Prepare Your Environment

1. **Create a `.env` file** in the project root:

   ```bash
   BOTBROWSER_EXEC_PATH=/absolute/path/to/botbrowser
   BOT_PROFILE_PATH=/absolute/path/to/bot-profile.enc
   ```

2. **Example**:

   ```bash
   BOTBROWSER_EXEC_PATH=/usr/local/bin/chromium
   BOT_PROFILE_PATH=/home/user/bot_profiles/chrome137_win11_x64.enc
   ```

3. **Verify** both paths:
   - `BOTBROWSER_EXEC_PATH` → BotBrowser executable
   - `BOT_PROFILE_PATH` → BotBrowser profile

---

### 2. Install & Run Tests

```bash
npm install           # Install dependencies
npx playwright test   # Execute all tests
npx playwright show-report  # (Optional) Generate a detailed HTML report
```

---

## ⚠️ Important Notes

1. **Demo-only tests** — these are proof-of-concept scripts to illustrate BotBrowser’s capabilities.
2. **No Responsibility Assumed** — this project does not assume responsibility for any misuse of these tests. Users must comply with relevant laws and target sites’ terms of service.

| 🛑 Blocks with Data-Center Proxies? | 🔄 Use Sticky-Session Rotating Residential IPs |
|-------------------------------------|-----------------------------------------------|

---

## 📖 Further Reading

- Playwright docs: https://playwright.dev/docs/writing-tests
- BotBrowser profiles & configs: https://github.com/MiddleSchoolStudent/BotBrowser/blob/main/profiles/profile-configs.md

---

## 🙏 Acknowledgements

This project utilizes the following open-source libraries:

- [dotenv](https://www.npmjs.com/package/dotenv)
- [ghost-cursor](https://www.npmjs.com/package/ghost-cursor)
- [ghost-cursor-playwright](https://www.npmjs.com/package/ghost-cursor-playwright)
