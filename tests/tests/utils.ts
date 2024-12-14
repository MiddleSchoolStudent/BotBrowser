import { Frame, Page } from 'playwright-core';

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForFrame({ page, url }: { page: Page; url: string }) {
    let frame: Frame | undefined;
    while (!frame) {
        await sleep(1000);
        frame = page.frames().find((frame) => frame.url().startsWith(url));
    }

    return frame;
}
