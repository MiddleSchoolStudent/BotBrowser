import { test } from '../global-setup';

test('temu', async ({ page }) => {
    await page.goto('https://www.temu.com/');
});
