import { expect, test } from '../global-setup';

test('checkout', async ({ page }) => {
    await page.goto('https://www.ticketmaster.com/');
    await page.goto(
        'https://www.ticketmaster.com/pinstripe-pass-new-york-yankees-v-bronx-new-york-06-06-2025/event/1D00611CCE275AF8'
    );
    await page.locator('button >> text=i agree').click();
    expect(await page.waitForSelector('h1 >> text=New York Yankees v. Boston Red Sox')).toBeTruthy();

    await page.locator('li[data-bdd="quick-picks-list-item-primary-1"]').click();
    await page.locator('button[data-bdd="offer-card-buy-button"] >> text=Next').click();
    await page.waitForSelector('div.text--primary >> text=Time Remaining');
});
