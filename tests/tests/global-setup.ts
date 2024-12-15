import { test as base } from '@playwright/test';
import { sleep } from './utils';

base.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        // @ts-expect-error - Playwright binding will cause leak
        delete window.__playwright__binding__;
        // @ts-expect-error - Playwright binding will cause leak
        delete window.__pwInitScripts;
    });
});

base.afterEach(async () => {
    await sleep(3_000); // sleep for 3 seconds for better video recording
});

export * from '@playwright/test';
export const test = base;