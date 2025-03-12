import { chromium } from "playwright";

const CHROMIUM_EXEC_PATH = process.env.CHROMIUM_EXEC_PATH; // Absolute path to the BotBrowser executable
const BOT_PROFILE_PATH = process.env.BOT_PROFILE_PATH; // Absolute path to the profile

const browser = await chromium.launch({
  browser: "chrome",
  executablePath: CHROMIUM_EXEC_PATH,
  headless: false, // Set to true for production
  ignoreDefaultArgs: [
    "--disable-crash-reporter",
    "--disable-crashpad-for-testing",
    "--disable-gpu-watchdog",
  ],
  args: [
    "--no-sandbox",
    "--disable-blink-features=AutomationControlled",
    "--disable-audio-output",
    `--bot-profile=${BOT_PROFILE_PATH}`,
  ],
});

const page = await browser.newPage();

// Remove Playwright's bindings to avoid detection.
await page.addInitScript(() => {
  delete window.__playwright__binding__;
  delete window.__pwInitScripts;
});

await page.goto("https://abrahamjuliot.github.io/creepjs/");
