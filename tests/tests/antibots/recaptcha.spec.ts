import { expect, test } from '../global-setup';
import { sleep, waitForFrame } from '../utils';

test('v2', async ({ page }) => {
    await page.goto('https://2captcha.com/demo/recaptcha-v2');

    const frame = await waitForFrame({
        page,
        url: 'https://www.google.com/recaptcha/api2/anchor',
    });

    await frame.waitForSelector("text=I'm not a robot").then((el) => el.click());

    expect(await page.waitForFunction(() => Boolean(grecaptcha.getResponse()))).toBeTruthy();
});

test('v3', async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto('https://antcpt.com/score_detector/', { timeout: 60_000 }).catch(() => {});

    let score: number = 0;
    for (let n = 0; n < 10; n++) {
        const yourScoreText = await page.locator('text=Your score is:').innerText();
        score = parseFloat(yourScoreText.match(/(0\.\d)/)![0]!);

        if (score < 0.5) {
            await page.locator('text=Refresh score now!').click();
            await sleep(3000);
            continue;
        }

        break;
    }

    expect(score).toBeGreaterThanOrEqual(0.5);
});
