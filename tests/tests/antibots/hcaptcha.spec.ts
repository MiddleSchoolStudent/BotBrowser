import { expect, test } from '../global-setup';

test('test hcaptcha', async ({ page }) => {
    await page.goto(`https://epicgames.com/id/login`);
    const apiResponsePromise = page.waitForResponse(
        (response) =>
            response.request().method() === 'POST' &&
            response.url().startsWith('https://www.epicgames.com/id/api/login'),
    );
    await page.locator('input#email').focus();
    await page
        .locator('input#email')
        .pressSequentially(
            Math.random().toString(36).substring(2) +
                Math.random().toString(36).substring(2) +
                '@gmail.com',
            { delay: 20 },
        );
    await page.keyboard.press('Tab');
    await page
        .locator('input#password')
        .pressSequentially(
            Math.random().toString(36).substring(2) +
                Math.random().toString(36).substring(5) +
                'AC?_',
            { delay: 20 },
        );
    await page.keyboard.press('Enter');

    const apiResponse = await apiResponsePromise;
    expect((await apiResponse.json()).errorCode).toBe(
        'errors.com.epicgames.account.invalid_account_credentials',
    );
});
