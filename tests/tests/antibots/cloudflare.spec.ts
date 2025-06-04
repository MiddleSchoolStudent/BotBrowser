import { expect, test } from '../global-setup';
import { generateRandomEmail, generateRandomPassword, generateRandomUsername, sleep, waitForFrame } from '../utils';

test('turnstile', async ({ page }) => {
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
    await frame.waitForSelector('text=Verify you are human').then((el) => el.click());

    expect(await frame.waitForSelector('span#success-text >> text=Success!')).toBeTruthy();
});

test('challenge', async ({ page }) => {
    await page.goto('https://2captcha.com/demo/cloudflare-turnstile');
    await page.locator('a >> text=Cloudflare Challenge').click();

    const frame = await waitForFrame({
        page,
        url: 'https://challenges.cloudflare.com/cdn-cgi/challenge-platform/',
    });

    // click "Verify you are human"
    await Promise.race([
        page.waitForSelector('text=Verify you are human').then((el) => el.click()),
        page.waitForSelector('text=Captcha is passed successfully!'),
    ]);

    expect(await page.waitForSelector('text=Captcha is passed successfully!')).toBeTruthy();
});

test('taxslayer', async ({ page }) => {
    await page.goto('https://www.taxslayer.com/myaccount/loginprev.aspx');

    // Wait for the frame that src is set to the cloudflare page "https://challenges.cloudflare.com/cdn-cgi/challenge-platform"
    waitForFrame({
        page,
        url: 'https://challenges.cloudflare.com/cdn-cgi/challenge-platform',
    }).then((frame) => {
        // click "Verify you are human"
        frame
            .waitForSelector('text=Verify you are human')
            .then((el) => el.click())
            .catch(() => {});
    });

    await page.locator('input[name="Username"]').fill(generateRandomUsername());
    await page.locator('input[name="Password"]').fill(generateRandomPassword());

    await sleep(8000);
    await page.locator('button#login').click();

    expect(await page.waitForSelector('text=Invalid username or password')).toBeTruthy();
});

test('chegg', async ({ page }) => {
    await page.goto('https://www.chegg.com/login');
    await page.locator('a >> text=Sign up').click();
    await sleep(2_000);
    await page.locator('input[name="email"]').pressSequentially(generateRandomEmail(), {
        delay: 20,
    });
    await sleep(2_000);
    await page.keyboard.press('Enter');
    await page.locator('input#code').pressSequentially('123456', {
        delay: 20,
    });
    await sleep(2_000);
    await page.keyboard.press('Enter');
    await sleep(2_000);
    await page.locator('span[data-error-code="invalid-code"]').waitFor({ state: 'visible' });
});

test('bookdemo', async ({ page }) => {
    await page.goto('https://www.cloudflare.com/en-ca/lp/dg/brand/bot-protection/');
    await page.locator('input#FirstName').pressSequentially('Василина', {
        delay: 100,
    });
    await page.locator('input#LastName').pressSequentially('Шкуро', {
        delay: 100,
    });
    await page.locator('input#Phone').pressSequentially('+380346558760', {
        delay: 100,
    });
    await page.locator('input#Email').pressSequentially(generateRandomEmail(), {
        delay: 100,
    });
    await page.locator('input#Company').pressSequentially('Cloudflare Inc', {
        delay: 100,
    });
    await page.locator('input#react-select-2-input').pressSequentially('C-Level', {
        delay: 100,
    });
    await page.keyboard.press('Enter');
    await page.locator('input#react-select-3-input').pressSequentially('DevOps', {
        delay: 100,
    });
    await page.keyboard.press('Enter');
    await page.locator('input#react-select-4-input').pressSequentially('United States', {
        delay: 100,
    });
    await page.keyboard.press('Enter');
    await page.locator('button >> text=BOOK A DEMO').click();
    await page.locator('h2 >> text=Thank You').waitFor({ state: 'visible' });
    await page.evaluate(() => window.scrollTo(0, 0));
});
