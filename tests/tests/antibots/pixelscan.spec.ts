import { expect, test } from '../global-setup';

test('test pixelscan', async ({ page }) => {
    await page.goto('https://pixelscan.net/');

    expect(
        await page.waitForSelector(
            'img.consistency-status-icon.d-sm-inline-block',
            { timeout: 60_000 },
        ),
    ).toBeTruthy();
});
