import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('test Brotector', async ({ page }) => {
    await page.goto('https://kaliiiiiiiiii.github.io/brotector/?crash=false');

    // Move the mouse on the page and Brotector will detect something
    await page.mouse.move(0, 0);
    await sleep(1000);
    await page.mouse.move(500, 500);

    const tableRowsCount = await page.locator('table').locator('tr').count();
    expect(tableRowsCount).toBe(2);
});
