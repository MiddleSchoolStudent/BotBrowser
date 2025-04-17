import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('iphey', async ({ page }) => {
    await page.goto('https://iphey.com');
    await sleep(10_000);

    const elements = await Promise.all([
        page.waitForSelector('text=Your browser displayed as real'),
        page.waitForSelector('text=Hardware parameters match each other'),
        page.waitForSelector("text=Software settings don't look suspicious"),
    ]);

    elements.forEach((element) => {
        expect(element).toBeTruthy();
    });

    for (let n = 0; n < 10; ++n) {
        await page.mouse.wheel(0, 200);
        await sleep(500);
    }
});
