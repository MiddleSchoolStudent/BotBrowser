import { test, expect } from '@playwright/test';

test('is devtools open', async ({ page }) => {
    await page.goto('about:blank');

    const isDevtoolsOpen = await page.evaluate(() => {
        function isDevtoolsOpen() {
            let result = false;
            const error = new Error();

            Object.defineProperty(error, 'stack', {
                configurable: false,
                enumerable: false,
                get: function () {
                    return (result = true), '';
                },
            });
            console.debug(error);
            return result;
        }

        return isDevtoolsOpen();
    });

    await expect(isDevtoolsOpen).toBe(false);
});
