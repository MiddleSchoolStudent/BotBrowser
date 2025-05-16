import { test } from '../global-setup';
import { sleep } from '../utils';

test('zillow', async ({ page }) => {
    await page.goto('https://www.zillow.com/');
    await sleep(5_000);
    await page.locator('#register-tab').click();
    await page
        .locator('input#inputs-newEmail')
        .pressSequentially(
            Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + '@gmail.com',
            { delay: 20 }
        );
    await sleep(2_000);
    await page.locator('input#password').pressSequentially('Fdf24+dvAc?_13', { delay: 20 });
    await sleep(2_000);
    await page.keyboard.press('Enter');
    await sleep(2_000);
    await page.locator('[[data-za-label="My Zillow"]]').waitFor({ state: 'visible' });
});
