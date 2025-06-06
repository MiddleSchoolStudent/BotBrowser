import { createCursor } from 'ghost-cursor-playwright';
import { test } from '../global-setup';
import { clickWithCursor, generateRandomEmail, generateRandomPassword, sleep } from '../utils';

test('signup', async ({ page }) => {
    test.setTimeout(150_000);
    await page.goto('https://www.tiktok.com/');
    for (let n = 0; n < 10; n++) {
        await page.mouse.wheel(0, 100);
        await sleep(1000);
    }

    await page.goto('https://www.tiktok.com/login/phone-or-email/email');
    await page.locator('input[name="username"]').pressSequentially(generateRandomEmail(), { delay: 150 });
    await page.keyboard.press('Tab');
    await page.locator('input[type="password"]').pressSequentially(generateRandomPassword(), { delay: 150 });
    await sleep(2000);
    await page.keyboard.press('Enter');
    await page.locator('span[role="status"] >> text=Account doesn\'t exist').waitFor({ state: 'visible' });
    await sleep(5000);

    await page.goto('https://www.tiktok.com/signup/phone-or-email/email');
    const cursor = await createCursor(page);
    await sleep(1000);

    await clickWithCursor(cursor, 'div[aria-label="Month. Double-tap for more options"]');
    await sleep(2000);
    await clickWithCursor(cursor, 'div#Month-options-item-0');
    await sleep(2000);

    await clickWithCursor(cursor, 'div[aria-label="Day. Double-tap for more options"]');
    await sleep(2000);
    await clickWithCursor(cursor, 'div#Day-options-item-0');
    await sleep(2000);

    await clickWithCursor(cursor, 'div[aria-label="Year. Double-tap for more options"]');
    await sleep(2000);
    await page.locator('div#Year-options-item-24').click();
    await sleep(2000);

    await clickWithCursor(cursor, 'input[name="email"]');
    await page.locator('input[name="email"]').pressSequentially(generateRandomEmail(), { delay: 150 });
    await sleep(2000);

    await page.keyboard.press('Tab');
    await page.locator('input[type="password"]').pressSequentially(generateRandomPassword(), { delay: 150 });
    await sleep(1000);

    await page.mouse.wheel(0, 100);
    await page.keyboard.press('Tab');
    await sleep(1000);
    await page.locator('button >> text=Send code').click();
    await sleep(10_000);

    await clickWithCursor(cursor, 'input[placeholder="Enter 6-digit code"]');
    await sleep(1000);
    await page.locator('input[placeholder="Enter 6-digit code"]').pressSequentially('321231', { delay: 150 });
    await page.keyboard.press('Enter');

    await page
        .locator('span[role="status"] >> text=Verification code is expired or incorrect')
        .waitFor({ state: 'visible' });
});
