import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('creepjs', async ({ page }) => {
    await page.goto('https://abrahamjuliot.github.io/creepjs/');

    await sleep(5_000);
    for (let i = 0; i < 90; i++) {
        await page.mouse.wheel(0, 50);
        await sleep(300);
    }

    expect(await page.waitForSelector('span.scale-down.grade-A >> text=A+')).toBeTruthy();
});
