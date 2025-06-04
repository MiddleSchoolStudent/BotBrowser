import { ElementHandle, expect, test } from '../global-setup';
import {
    clickLocatorWithMouse,
    generateRandomEmail,
    generateRandomPassword,
    generateRandomUsername,
    sleep,
} from '../utils';

test('epicgames', async ({ page }) => {
    await page.goto(`https://epicgames.com/id/login`);
    const apiResponsePromise = page.waitForResponse(
        (response) =>
            response.request().method() === 'POST' &&
            response.url().startsWith('https://www.epicgames.com/id/api/login')
    );
    await page.locator('input#email').focus();
    await page.locator('input#email').pressSequentially(generateRandomEmail(), { delay: 20 });
    await page.keyboard.press('Tab');
    await page.locator('input#password').pressSequentially(generateRandomPassword(), {
        delay: 20,
    });
    await page.keyboard.press('Enter');

    const apiResponse = await apiResponsePromise;
    expect((await apiResponse.json()).errorCode).toBe('errors.com.epicgames.account.invalid_account_credentials');
});

test('discord', async ({ page }) => {
    await page.goto(`https://discord.com/login`);
    await page.locator('input[name="email"]').pressSequentially(generateRandomEmail(), { delay: 20 });
    await page.keyboard.press('Tab');
    await page.locator('input[name="password"]').pressSequentially(generateRandomPassword(), {
        delay: 20,
    });
    await page.keyboard.press('Enter');

    console.log('Waiting for captcha frame');
    const captchaIframe = (await page.waitForSelector(
        'iframe[src^="https://newassets.hcaptcha.com/captcha/v1"][style*="width"]'
    )) as ElementHandle<HTMLIFrameElement>;
    const captchaFrame = (await captchaIframe.contentFrame())!;
    console.log('Captcha frame found');

    const apiResponsePromise = page.waitForResponse(
        (response) =>
            response.request().method() === 'POST' && response.url().startsWith('https://discord.com/api/v9/auth/login')
    );

    await clickLocatorWithMouse(captchaFrame, 'div#checkbox');
    console.log('Captcha clicked');

    const apiResponse = await apiResponsePromise;
    expect((await apiResponse.json()).code).toBe(50035);
});

test('steam', async ({ page }) => {
    const email = generateRandomEmail();
    await page.goto(`https://store.steampowered.com/join`);
    await page.locator('input[name="email"]').pressSequentially(email, { delay: 100 });
    await page.keyboard.press('Tab');
    await page.locator('input[name="reenter_email"]').pressSequentially(email, {
        delay: 100,
    });

    await page.locator('input#i_agree_check').click();

    const captchaIframe = (await page.waitForSelector(
        'iframe[src^="https://newassets.hcaptcha.com/captcha/v1"][style*="width"]'
    )) as ElementHandle<HTMLIFrameElement>;
    const captchaFrame = (await captchaIframe.contentFrame())!;
    await clickLocatorWithMouse(captchaFrame, 'div#checkbox');
    console.log('Captcha clicked');

    await sleep(10000);
    await page.locator('button#createAccountButton').click();

    const apiResponsePromise = page.waitForResponse(
        (response) =>
            response.request().method() === 'POST' &&
            response.url().startsWith('https://store.steampowered.com/join/ajaxcheckemailverified')
    );

    const apiResponse = await apiResponsePromise;
    expect((await apiResponse.json()).success).toBe(36);
});

test('riotgames', async ({ page }) => {
    const username = generateRandomUsername();
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    // Login
    await page.goto(`https://www.riotgames.com/en`);
    await page.locator('a[data-testid="riotbar:account:button-login"]').click();
    await page.locator('input[name="username"]').pressSequentially(username, { delay: 20 });
    await page.keyboard.press('Tab');
    await page.locator('input[name="password"]').pressSequentially(password, {
        delay: 20,
    });
    await page.keyboard.press('Enter');
    await page.waitForSelector('p[data-testid="error-message"] >> text=Your username or password may be incorrect');

    // Register
    await page.locator('a[href^="https://auth.riotgames.com/authorize"]').click();
    await page.locator('input[data-testid="riot-signup-email"]').pressSequentially(email, {
        delay: 20,
    });
    await page.keyboard.press('Enter');

    await page.locator('input[name="birth_date_month"]').pressSequentially('01', {
        delay: 20,
    });
    await page.locator('input[name="birth_date_day"]').pressSequentially('01', {
        delay: 20,
    });
    await page.locator('input[name="birth_date_year"]').pressSequentially('1998', {
        delay: 20,
    });
    await page.keyboard.press('Enter');

    await page.locator('input[data-testid="riot-signup-username"]').pressSequentially(username, {
        delay: 20,
    });
    await page.keyboard.press('Enter');

    await page.locator('input[name="password"]').pressSequentially(password, {
        delay: 20,
    });
    await page.locator('input[name="password-confirm"]').pressSequentially(password, {
        delay: 20,
    });
    await page.keyboard.press('Enter');

    await sleep(5_000);
    const tosElem = await page.waitForSelector('div#tos-scrollable-area');
    const tosElemBox = await tosElem.boundingBox();
    await page.mouse.move(tosElemBox!.x + tosElemBox!.width / 2, tosElemBox!.y + tosElemBox!.height / 2);
    await page.mouse.wheel(0, 2000);
    await page.locator('input[id="tos-checkbox"]').click();
    await page.locator('button[data-testid="btn-accept-tos"]').click();

    await page.waitForNavigation({ url: 'https://www.riotgames.com/en' });
});
