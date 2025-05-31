import { test } from '../global-setup';

test('smartcaptcha', async ({ page }) => {
    await page.goto('https://smartcaptcha.yandexcloud.net/demo');
    const frame = page.frameLocator('iframe[data-testid="checkbox-iframe"]');
    await frame.locator('input#js-button').waitFor({ state: 'visible', timeout: 5000 });
    await frame.locator('input#js-button').click({ force: true });
    await frame
        .locator('div.CheckboxCaptcha-Checkbox[data-checked="true"]')
        .waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('input#smartcaptcha-demo-submit').click();
    await page.locator('div.greeting >> text=Hello, user!').waitFor({
        state: 'visible',
        timeout: 5000,
    });
});
