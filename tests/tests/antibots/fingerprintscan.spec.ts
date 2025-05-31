import { test } from '../global-setup';

test('fingerprintscan', async ({ page }) => {
    await page.goto('https://fingerprint-scan.com');
    await page.locator('div#fingerprintScore >> text=Bot Risk Score: 20/100').waitFor({ state: 'visible' });
});
