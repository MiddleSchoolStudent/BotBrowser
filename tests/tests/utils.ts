import { Cursor } from 'ghost-cursor-playwright';
import assert from 'node:assert';
import { Frame, Page } from 'playwright-core';

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForFrame(options: { page: Page; url: string | RegExp } | { page: Page; title: string }) {
    let frame: Frame | undefined;
    while (!frame) {
        await sleep(500);

        const frames = options.page.frames();
        for (const f of frames) {
            if ('url' in options) {
                if (typeof options.url === 'string') {
                    if (f.url() === options.url) {
                        frame = f;
                        break;
                    }
                } else {
                    if (options.url.test(f.url())) {
                        frame = f;
                        break;
                    }
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

export function generateRandomUsername(length = 15) {
    return (
        Math.random().toString(36).substring(2).replace(/\d+/g, '') +
        Math.random().toString(36).substring(2).replace(/\d+/g, '')
    ).substring(0, length);
}

export function generateRandomEmail() {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + '@gmail.com';
}

export function generateRandomPassword(length = 15) {
    return (
        (Math.random().toString(36).substring(2) + Math.random().toString(36).substring(5)).substring(0, length - 4) +
        'AC?_'
    );
}

export async function clickWithCursor(cursor: Cursor, selector: string) {
    const boundingBox = await cursor.page.locator(selector).boundingBox();
    assert(boundingBox, `Bounding box for selector "${selector}" should not be null`);
    await cursor.actions.click({ target: boundingBox, waitBeforeClick: [100, 200] });
}

export async function enableMouseMovementOverlay(page: Page) {
    await page.addInitScript(() => {
        window.addEventListener('DOMContentLoaded', () => {
            const canvas = Object.assign(document.createElement('canvas'), {
                width: window.innerWidth,
                height: window.innerHeight,
            });
            Object.assign(canvas.style, {
                userSelect: 'none',
                pointerEvents: 'none',
                position: 'fixed',
                left: '0',
                top: '0',
                width: '100vw',
                height: '100vh',
                zIndex: Number.MAX_SAFE_INTEGER.toString(),
            });
            document.body.appendChild(canvas);

            const cxt = canvas.getContext('2d');
            if (!cxt) return;

            const drawCircle = (x: number, y: number, r: number, color: string) => {
                cxt.fillStyle = color;
                cxt.beginPath();
                cxt.arc(x, y, r, 0, 2 * Math.PI);
                cxt.fill();
            };

            document.addEventListener('mousemove', (e) => drawCircle(e.clientX, e.clientY, 3, 'red'));
            document.addEventListener('mousedown', (e) => drawCircle(e.clientX, e.clientY, 8, 'green'));
            document.addEventListener('mouseup', (e) => drawCircle(e.clientX, e.clientY, 5, 'yellow'));
        });
    });
}
