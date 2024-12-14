import { test as base } from '@playwright/test';

base.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        // @ts-expect-error - Playwright binding will cause leak
        delete window.__playwright__binding__;
        // @ts-expect-error - Playwright binding will cause leak
        delete window.__pwInitScripts;
    });
});

export * from '@playwright/test';
export const test = base;
