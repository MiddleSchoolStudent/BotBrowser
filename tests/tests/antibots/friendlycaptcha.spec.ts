import { test } from '../global-setup';

test('captchademo', async ({ page }) => {
    await page.goto('https://friendlycaptcha.com/#demo');
    const captchaFrame = page.frameLocator('iframe.frc-i-widget');
    await captchaFrame.locator('button.checkbox.icon.fade-in[role="checkbox"]').click();
    await captchaFrame.locator('span[data-loc="t_completed"] >> text=I am human').waitFor({ state: 'visible' });
    await page.locator('input[placeholder="Start typing. See the difference."]').fill('Hello, world!');
    await page.locator('button[type="submit"]').click();
    await page.locator('h3 >> text=Friendly Captcha verification success').waitFor({ state: 'visible' });
});
