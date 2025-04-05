import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('Brotector', async ({ page }) => {
    await page.goto('https://kaliiiiiiiiii.github.io/brotector/?crash=false');

    // Move the mouse on the page and Brotector will detect something
    await page.mouse.move(0, 0);

    for (let i = 0; i < 10; i++) {
        await sleep(Math.random() * 2000 + 500);
        await page.mouse.move(Math.random() * 1000, Math.random() * 1000, {
            steps: Math.floor(Math.random() * 100) + 1,
        });
    }

    const tableRowsCount = await page.locator('table').locator('tr').count();
    expect(tableRowsCount).toBe(2);
});
