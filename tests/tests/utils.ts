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
