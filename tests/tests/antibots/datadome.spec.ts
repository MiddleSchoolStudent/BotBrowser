import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('test shutterstock.com', async ({ page }) => {
    await page.goto('https://www.shutterstock.com/search');

    const apiResponsePromise = page.waitForResponse((response) =>
        response.url().endsWith('/search/nature.json?term=nature'),
    );

    await page.locator('input#search-bar').fill('nature');
    await page.locator('button[aria-label="Search"]').click();

    const apiResponse = await apiResponsePromise;
    expect(apiResponse.status()).toBe(200);
    const apiResponseJson = await apiResponse.json();
    expect(
        apiResponseJson.botProps.isGoodBot === false &&
            apiResponseJson.botProps.isSuspectedBadBot === false,
    ).toBeTruthy();

    await sleep(5000);
});
