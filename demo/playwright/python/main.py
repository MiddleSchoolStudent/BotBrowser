import asyncio
import os

from playwright.async_api import async_playwright

CHROMIUM_EXEC_PATH: str = os.getenv("CHROMIUM_EXEC_PATH", "")
BOT_PROFILE_PATH: str = os.getenv("BOT_PROFILE_PATH", "")

if not CHROMIUM_EXEC_PATH or not BOT_PROFILE_PATH:
    raise ValueError("Both CHROMIUM_EXEC_PATH and BOT_PROFILE_PATH environment variables must be set.")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch_persistent_context(
            user_data_dir="./user_data",
            executable_path=CHROMIUM_EXEC_PATH,
            headless=False,
            ignore_default_args=[
                "--disable-crash-reporter",
                "--disable-crashpad-for-testing",
                "--disable-gpu-watchdog",
            ],
            args=[
                "--no-sandbox",
                "--disable-blink-features=AutomationControlled",
                "--disable-audio-output",
                f"--bot-profile={BOT_PROFILE_PATH}",
            ],
        )
        page = await browser.new_page()
        await page.goto("https://www.google.com")
        await asyncio.Event().wait()

asyncio.run(main())
