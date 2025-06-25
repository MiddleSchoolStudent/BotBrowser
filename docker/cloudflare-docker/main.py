import asyncio
import os
from playwright.async_api import async_playwright, Page

BOTBROWSER_EXEC_PATH: str = os.getenv("BOTBROWSER_EXEC_PATH", "")
BOT_PROFILE_PATH: str = os.getenv("BOT_PROFILE_PATH", "")

if not BOTBROWSER_EXEC_PATH:
    raise ValueError("BOTBROWSER_EXEC_PATH variable must be set")


async def get_frame_element_and_box(
    page: Page,
    title: str = "Checking your Browser…",
    timeout: float = 30_000  # milliseconds
):
    # 1. Wait to get the target Frame
    deadline = page.context._loop.time() + timeout / 1000
    target_frame = None
    while True:
        for frame in page.frames:
            try:
                frame_title = await frame.title()
                if frame_title == title:
                    target_frame = frame
                    break
            except:
                continue
        if target_frame or page.context._loop.time() > deadline:
            break
        await asyncio.sleep(0.1)

    if not target_frame:
        raise f"Could not find a frame with title '{title}' within {timeout}ms"

    # 2. Get the corresponding <iframe> element
    # Playwright Python provides Frame.frame_element() to get the ElementHandle corresponding to the Frame
    frame_element = await target_frame.frame_element()

    # 3. Calculate and return its bounding box
    # ElementHandle.bounding_box() returns a dict containing x, y, width, height
    box = await frame_element.bounding_box()

    return frame_element, box


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

    await page.goto("https://www.cloudflare.com/en-us/lp/dg/brand/bot-protection/")

    await page.locator("input#FirstName").press_sequentially("Einstein", delay=100)
    await page.locator("input#LastName").press_sequentially("Albert", delay=100)
    await page.locator("input#Phone").press_sequentially("+380346558760", delay=100)
    await page.locator("input#Email").press_sequentially("einsteinalbert18791955@gmail.com", delay=100)
    await page.locator("input#Company").press_sequentially("Special relativity Inc.", delay=100)

    await page.locator("input#react-select-2-input").press_sequentially("C-Level", delay=100)
    await page.keyboard.press("Enter")

    await page.locator("input#react-select-3-input").press_sequentially("DevOps", delay=100)
    await page.keyboard.press("Enter")

    await page.locator("input#react-select-4-input").press_sequentially("United States", delay=100)
    await page.keyboard.press("Enter")

    print("checking for the frame...")
    iframe_handle, bounding = await get_frame_element_and_box(page)
    print("Found the frame, bounding box:", bounding)

    # Click on the checkbox
    await page.mouse.click(bounding["x"] + 30, bounding["y"] + 30)

    await page.locator("button >> text=BOOK A DEMO").click()
    await page.locator("h2 >> text=Thank You").wait_for(state="visible")

    await page.evaluate("window.scrollTo(0, 0)")

    await page.screenshot(path=f"screenshots/screenshot.png")
    print(f"Saved screenshot")

    await browser.close()


async def main():
    async with async_playwright() as p:
        await process(p)

if __name__ == "__main__":
    asyncio.run(main())
