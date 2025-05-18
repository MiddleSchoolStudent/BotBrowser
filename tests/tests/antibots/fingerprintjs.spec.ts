import { expect, test } from '../global-setup';
import { sleep } from '../utils';

test('botdetection', async ({ page }) => {
    await page.goto('https://fingerprint.com/products/bot-detection/');

    expect(
        await page.waitForSelector('h2 >> text=You are not a bot', {
            timeout: 20_000,
        })
    ).toBeTruthy();
});

test('playground', async ({ page }) => {
    await page.goto('https://demo.fingerprint.com/playground');

    await sleep(5_000);
    for (let i = 0; i < 20; i++) {
        await page.mouse.wheel(0, 50);
        await sleep(300);
    }
});
