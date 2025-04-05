import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('iphey', async ({ page }) => {
    await page.goto('https://iphey.com');
    await sleep(20_000);

    const elements = await Promise.all([
        page.waitForSelector('text=Your browser displayed as real'),
        page.waitForSelector('text=Hardware parameters match each other'),
        page.waitForSelector("text=Software settings don't look suspicious"),
    ]);

    elements.forEach((element) => {
        expect(element).toBeTruthy();
    });
});
