import { expect, test } from '../global-setup';
import { waitForFrame } from '../utils';

test('test Cloudflare turnstile', async ({ page }) => {
    await page.addInitScript(() => {
        const originalAttachShadow = Element.prototype.attachShadow;
        Element.prototype.attachShadow = function (init) {
            init.mode = 'open';
            return originalAttachShadow.call(this, init);
        };
    });
    await page.goto('https://2captcha.com/demo/cloudflare-turnstile');

    // Wait for the frame that src is set to the cloudflare page "https://challenges.cloudflare.com/cdn-cgi/challenge-platform"
    const frame = await waitForFrame({
        page,
        url: 'https://challenges.cloudflare.com/cdn-cgi/challenge-platform',
    });

    // click "Verify you are human"
    await frame
        .waitForSelector('text=Verify you are human')
        .then((el) => el.click());

    expect(
        await frame.waitForSelector('span#success-text >> text=Success!'),
    ).toBeTruthy();
});

test('test Cloudflare challenge', async ({ page }) => {
    await page.goto('https://2captcha.com/demo/cloudflare-turnstile');
    await page.locator('a >> text=Cloudflare Challenge').click();

    const frame = await waitForFrame({
        page,
        url: 'https://challenges.cloudflare.com/cdn-cgi/challenge-platform/',
    });

    // click "Verify you are human"
    await Promise.race([
        page
            .waitForSelector('text=Verify you are human')
            .then((el) => el.click()),
        page.waitForSelector('text=Captcha is passed successfully!'),
    ]);

    expect(
        await page.waitForSelector('text=Captcha is passed successfully!'),
    ).toBeTruthy();
});
