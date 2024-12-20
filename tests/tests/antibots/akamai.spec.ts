import { expect, test } from '../global-setup';

test('test playstation.com', async ({ page }) => {
    await page.goto('https://www.playstation.com/en-us/');
    await page.locator('button >> text=Sign In').click();

    await page.locator('input#signin-entrance-input-signinId').focus();
    await page
        .locator('input#signin-entrance-input-signinId')
        .pressSequentially(
            Math.random().toString(36).substring(2) +
                Math.random().toString(36).substring(2) +
                '@gmail.com',
            { delay: 100 },
        );

    await page.keyboard.press('Enter');

    await page.locator('input#signin-password-input-password').focus();
    await page
        .locator('input#signin-password-input-password')
        .pressSequentially(
            Math.random().toString(36).substring(2) +
                Math.random().toString(36).substring(5) +
                'AC?_',
            { delay: 150 },
        );

    const responseWaiter = page.waitForResponse(
        (resp) =>
            resp.url() === 'https://ca.account.sony.com/api/v1/ssocookie' &&
            resp.status() === 400,
    );
    await page.keyboard.press('Enter');

    expect(await responseWaiter).toBeTruthy();
});
