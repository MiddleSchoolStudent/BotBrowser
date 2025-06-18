import asyncio
import os
import datetime
import json
from playwright.async_api import async_playwright

BOTBROWSER_EXEC_PATH: str = os.getenv("BOTBROWSER_EXEC_PATH", "")
BOT_PROFILE_PATH: str = os.getenv("BOT_PROFILE_PATH", "")

if not BOTBROWSER_EXEC_PATH:
    raise ValueError("BOTBROWSER_EXEC_PATH variable must be set")


async def process(playwright):
    browser = await playwright.chromium.launch(
        executable_path=BOTBROWSER_EXEC_PATH,
        headless=True,
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

    # Avoid Playwright's default bindings
    await page.add_init_script("""
       delete window.__playwright__binding__;
       delete window.__pwInitScripts;
   """)

    await page.goto("https://www.wizzair.com/")
    await asyncio.sleep(1)

    os.makedirs("flight_data", exist_ok=True)
    os.makedirs("screenshots", exist_ok=True)

    start_date = datetime.date(2025, 8, 16)
    end_date = datetime.date(2025, 9, 16)
    current_date = start_date

    while current_date <= end_date:
        date_str = current_date.strftime("%Y-%m-%d")
        print(f"Collecting data for {date_str}")

        data_event = asyncio.Event()
        data_for_day = None

        async def handle_response(response):
            nonlocal data_for_day
            if "/Api/search/search" in response.url:
                try:
                    data_for_day = await response.json()
                    print(f"Data collected for {date_str}")
                    data_event.set()
                except:
                    pass

        page.on("response", handle_response)

        url = f"https://www.wizzair.com/en-gb/booking/select-flight/CRL/BUD/{date_str}/null/1/0/0/null"
        await page.goto(url)

        try:
            await asyncio.wait_for(data_event.wait(), timeout=10)
        except asyncio.TimeoutError:
            print(f"Timeout for {date_str}")

        if data_for_day:
            with open(f"flight_data/{date_str}.json", "w") as f:
                json.dump(data_for_day, f, indent=2)
            print(f"Saved data for {date_str}")

            await page.screenshot(path=f"screenshots/{date_str}.png")
            print(f"Saved screenshot for {date_str}")

        page.remove_listener("response", handle_response)
        current_date += datetime.timedelta(days=1)

    await browser.close()


async def main():
    async with async_playwright() as p:
        await process(p)

if __name__ == "__main__":
    asyncio.run(main())
