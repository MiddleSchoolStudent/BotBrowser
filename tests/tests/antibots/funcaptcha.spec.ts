import { expect, test } from '../global-setup';
import { waitForFrame } from '../utils';

test('blizzard', async ({ page }) => {
    await page.goto(`https://account.battle.net/creation/flow/creation-full`);
    await page.locator('input[name="dob-plain"]').focus();
    await page.keyboard.type('01/01/1998', { delay: 20 });
    await page.locator('button#flow-form-submit-btn').click();
    await page.locator('input#capture-first-name').pressSequentially(Math.random().toString(36).substring(5), {
        delay: 20,
    });
    await page.locator('input#capture-last-name').pressSequentially(Math.random().toString(36).substring(5), {
        delay: 20,
    });
    await page.locator('button#flow-form-submit-btn').click();
    await page
        .locator('input#capture-email')
        .pressSequentially(
            Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + '@gmail.com',
            { delay: 20 }
        );
    await page.locator('button#flow-form-submit-btn').click();
    await page.locator('span >> text=By checking this box').click();
    await page.locator('button#flow-form-submit-btn').click();
    await page
        .locator('input#capture-password')
        .pressSequentially(Math.random().toString(36).substring(2) + Math.random().toString(36).substring(5) + 'AC?_', {
            delay: 20,
        });
    await page.locator('button#flow-form-submit-btn').click();
    await page.locator('button#flow-form-submit-btn').click();

    const fcFrame = await waitForFrame({
        page,
        url: 'https://blizzard-api.arkoselabs.com/fc/assets/ec-game-core',
    });
    await fcFrame.locator('button[data-theme="home.verifyButton"]').click();

    await expect(page.locator('div.step-icon--success')).toBeVisible({ timeout: 60_000 });
});
