import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('test browserscan', async ({ page }) => {
    await page.goto('https://www.browserscan.net/');
    await sleep(20_000);

    expect(
        await page.locator('text=Browser fingerprint authenticity: 95%'),
    ).toBeTruthy();
});
