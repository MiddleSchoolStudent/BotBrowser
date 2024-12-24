import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('test fv.pro', async ({ page }) => {
    test.setTimeout(60_000);

    await page.goto('https://fv.pro');
    await sleep(30_000);

    expect(
        await page
            .locator('text=It looks like you are using real browser')
            .isVisible(),
    ).toBeTruthy();

    await expect(
        page.locator('text=Your browser environment is not real'),
    ).toBeHidden();
});
