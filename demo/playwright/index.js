import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CHROMIUM_EXEC_PATH = path.resolve(
  fileURLToPath(import.meta.url),
  "../../../binary/macarm/Chromium.app/Contents/MacOS/Chromium"
);
const BOT_PROFILE_PATH = path.resolve(
  fileURLToPath(import.meta.url),
  "../../../profiles/chrome128-macarm.enc"
);

const browser = await chromium.launch({
  browser: "chrome",
  executablePath: CHROMIUM_EXEC_PATH,
  headless: false,
  ignoreDefaultArgs: [
    // "--headless",
    "--disable-crash-reporter",
    "--disable-crashpad-for-testing",
    "--disable-gpu-watchdog",
  ],
  args: [
    "--no-sandbox",
    "--disable-blink-features=AutomationControlled",
    "--disable-audio-output",
    `--bot-profile=${BOT_PROFILE_PATH}`,
    // '--headless="new"',
  ],
});

const page = await browser.newPage();
await page.goto("https://www.google.com");
