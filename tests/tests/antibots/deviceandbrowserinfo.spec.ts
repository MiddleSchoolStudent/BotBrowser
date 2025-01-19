import { expect, test } from '../global-setup';

test('test deviceandbrowserinfo', async ({ page }) => {
    await page.goto(`https://deviceandbrowserinfo.com/are_you_a_bot`);
    expect(page.locator('text=You are human').isVisible()).toBeTruthy();
});
