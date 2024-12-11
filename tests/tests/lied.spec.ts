import { test, expect } from '@playwright/test';

test('iframe size', async ({ page }) => {
    await page.goto('about:blank');

    // Inspired by Kasada
    const result = await page.evaluate(() => {
        const windowInnerWidth = window.innerWidth;
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        return windowInnerWidth === iframe.contentWindow?.innerWidth;
    });

    await expect(result).toBe(false);
});
