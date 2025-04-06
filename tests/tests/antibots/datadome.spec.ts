import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('shutterstock', async ({ page }) => {
    await page.goto('https://www.shutterstock.com/search');

    const apiResponsePromise = page.waitForResponse((response) =>
        response.url().endsWith('/search/nature.json?term=nature')
    );

    await page.locator('input#search-bar').fill('nature');
    await page.locator('button[aria-label="Search"]').click();

    const apiResponse = await apiResponsePromise;
    expect(apiResponse.status()).toBe(200);
    const apiResponseJson = await apiResponse.json();
    expect(
        apiResponseJson.botProps.isGoodBot === false && apiResponseJson.botProps.isSuspectedBadBot === false
    ).toBeTruthy();

    await sleep(5000);
});

test('seatgeek', async ({ page }) => {
    await page.goto(
        'https://seatgeek.com/lady-gaga-tickets/new-york-new-york-madison-square-garden-2025-09-06-8-pm/concert/17460509'
    );
    await expect(page.locator('span[role="heading"]').textContent()).resolves.toMatch(/How many tickets/);
});
