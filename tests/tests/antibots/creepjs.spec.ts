import { expect, test } from '../global-setup';

test('creepjs', async ({ page }) => {
    await page.goto('https://abrahamjuliot.github.io/creepjs/');

    expect(await page.waitForSelector('span.scale-down.grade-D >> text=D+')).toBeTruthy();
});
