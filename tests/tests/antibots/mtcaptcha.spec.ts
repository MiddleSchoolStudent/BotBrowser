import { test } from '../global-setup';

test('invisiblecaptcha', async ({ page }) => {
    await page.goto('https://www.mtcaptcha.com/');
    await page.locator('#demo-invisible-checkmark1').scrollIntoViewIfNeeded();
    await page.locator('#demo-invisible-checkmark1 + .demo-checkmark').click({ force: true });
    await page.locator('#msg-invisible-verified >> text=verified successfully').waitFor({ state: 'visible' });
});
