import { Frame, Page } from 'playwright-core';

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForFrame(options: { page: Page; url: string } | { page: Page; title: string }) {
    let frame: Frame | undefined;
    while (!frame) {
        await sleep(500);

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

export function clickLocatorWithMouse(page: Page | Frame, locator: string) {
    const actualPage = 'page' in page ? page.page() : page;
    return page
        .locator(locator)
        ?.boundingBox()
        .then(async (box) => {
            console.log('locator', locator, box);

            if (box) {
                await actualPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                await actualPage.mouse.down();
                await sleep(200);
                await actualPage.mouse.up();
            }
        });
}

export function generateRandomUsername() {
    return (
        Math.random().toString(36).substring(2).replace(/\d+/g, '') +
        Math.random().toString(36).substring(2).replace(/\d+/g, '')
    );
}

export function generateRandomEmail() {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + '@gmail.com';
}

export function generateRandomPassword() {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(5) + 'AC?_';
}
