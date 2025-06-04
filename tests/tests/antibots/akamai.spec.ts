import { expect, test } from '../global-setup';
import { generateRandomEmail, generateRandomPassword } from '../utils';

test('playstation', async ({ page }) => {
    await page.goto('https://www.playstation.com/en-us/');
    await page.locator('button >> text=Sign In').click();

    await page.locator('input#signin-entrance-input-signinId').focus();
    await page.locator('input#signin-entrance-input-signinId').pressSequentially(generateRandomEmail(), { delay: 100 });

    await page.keyboard.press('Enter');

    await page.locator('input#signin-password-input-password').focus();
    await page.locator('input#signin-password-input-password').pressSequentially(generateRandomPassword(), {
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

test('aircanada', async ({ page }) => {
    await page.goto('https://www.aircanada.com/home/us/en/aco/flights');
    await page.waitForTimeout(5000); // Wait for the page to load completely
    await page.goto(
        'https://www.aircanada.com/booking/us/en/aco/search?org0=NYC&dest0=YTO&orgType0=C&destType0=C&departureDate0=28%2F12%2F2025&adt=1&yth=0&chd=0&inf=0&ins=0&marketCode=DOM&tripType=OneWay&isFlexible=false'
    );
    await page.locator('abc-tab-button span.departure-date >> text=Sun Dec 28').waitFor({
        state: 'visible',
        timeout: 30000,
    });
});
