import { Frame, Page } from 'playwright-core';

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForFrame(
    options: { page: Page; url: string } | { page: Page; title: string },
) {
    let frame: Frame | undefined;
    while (!frame) {
        await sleep(1000);

        const frames = options.page.frames();
        for (const f of frames) {
            if ('url' in options) {
                if (f.url() === options.url) {
                    frame = f;
                    break;
                }
            } else {
                if ((await f.title()) === options.title) {
                    frame = f;
                    break;
                }
            }
        }
    }

    return frame;
}

export function getDateFormatted(dayDiff = 0) {
    const today = new Date();
    today.setDate(today.getDate() + dayDiff);

    return new Intl.DateTimeFormat('lt-LT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(today);
}

export function clickLocatorWithMouse(page: Page, locator: string) {
    return page
        .locator(locator)
        ?.boundingBox()
        .then(async (box) => {
            if (box) {
                await page.mouse.move(
                    box.x + box.width / 2,
                    box.y + box.height / 2,
                );
                await page.mouse.down();
                await sleep(200);
                await page.mouse.up();
            }
        });
}
