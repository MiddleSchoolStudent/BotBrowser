import { expect, test } from '../global-setup';

test('playstation', async ({ page }) => {
    await page.goto('https://www.playstation.com/en-us/');
    await page.locator('button >> text=Sign In').click();

    await page.locator('input#signin-entrance-input-signinId').focus();
    await page
        .locator('input#signin-entrance-input-signinId')
        .pressSequentially(
            Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + '@gmail.com',
            { delay: 100 }
        );

    await page.keyboard.press('Enter');

    await page.locator('input#signin-password-input-password').focus();
    await page
        .locator('input#signin-password-input-password')
        .pressSequentially(Math.random().toString(36).substring(2) + Math.random().toString(36).substring(5) + 'AC?_', {
            delay: 150,
        });

    const responseWaiter = page.waitForResponse(
        (resp) => resp.url() === 'https://ca.account.sony.com/api/v1/ssocookie' && resp.status() === 400
    );
    await page.keyboard.press('Enter');

    expect(await responseWaiter).toBeTruthy();
});

test('stubhub', async ({ page }) => {
    const apiResponsePromise = page.waitForResponse(
        (response) =>
            response.request().method() === 'POST' &&
            response.url().startsWith('https://www.stubhub.com/Browse/VenueMap/GetMapAvailabilityAndPrices/')
    );
    await page.goto('https://www.stubhub.com/nate-bargatze-new-york-tickets-9-26-2025/event/156893777/?quantity=2');

    expect(await apiResponsePromise).toBeTruthy();
});
