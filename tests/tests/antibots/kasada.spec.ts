import { expect, test } from '../global-setup';
import { generateRandomEmail, generateRandomPassword, generateRandomUsername, getDateFormatted, sleep } from '../utils';

test('kick', async ({ page }) => {
    await page.goto('https://www.kick.com');

    // click on the sign up button
    await Promise.race([
        // cloudflare: click: Verify you are human
        page.waitForSelector('text=Verify you are human').then((el) => el.click()),
        // Sign Up: click: text=Sign Up
        await page.waitForSelector('text=Sign Up').then((el) => el.click()),
    ]);

    // type in random email
    await page.locator('input[name="email"]').pressSequentially(generateRandomEmail(), { delay: 40 });

    // type in random birthdate
    await page.locator('input[name="birthdate"]').pressSequentially('1995-01-01', { delay: 40 });

    // type in random username
    await page.locator('input[name="username"]').pressSequentially(generateRandomUsername(), {
        delay: 40,
    });

    // type in random password
    await page.locator('input[name="password"]').pressSequentially(generateRandomPassword(), {
        delay: 40,
    });

    // click on the sign up button
    await page.locator('button[type="submit"] >> text=Sign Up').click();

    // wait for "Email Verification" text to appear
    expect(await page.waitForSelector('text=Email Verification')).toBeTruthy();
});

test('wizzair', async ({ page }) => {
    const tomorrowDate = getDateFormatted(1);

    const apiResponsePromise = page.waitForResponse((response) => response.url().endsWith('/Api/search/search'));
    await page.goto(`https://wizzair.com/en-gb/booking/select-flight/TIA/BRI/${tomorrowDate}/null/1/0/0/null`);

    const apiResponse = await apiResponsePromise;

    // If it's 429 it means it was blocked by Kasada
    expect(apiResponse.status()).toBe(200);
});

test('twitch', async ({ page }) => {
    // Login
    await page.goto('https://www.twitch.tv/wv/auth/login');
    await page.locator('input#login-username').pressSequentially(generateRandomUsername(), {
        delay: 40,
    });
    await page.locator('input#password-input').pressSequentially(generateRandomPassword(), {
        delay: 40,
    });
    await page.keyboard.press('Enter');

    expect(
        await Promise.race([
            page.waitForSelector('text=That password was incorrect'),
            page.waitForSelector('text=This username does not exist'),
        ])
    ).toBeTruthy();

    await sleep(5_000);

    // Register
    await page.goto('https://www.twitch.tv/wv/auth/signup');
    await page.locator('input#signup-username').pressSequentially(generateRandomUsername(), {
        delay: 40,
    });
    await page.locator('input#password-input').pressSequentially(generateRandomPassword(), {
        delay: 40,
    });
    await page.selectOption('select[data-a-target="birthday-month-select"]', '2');
    await page.selectOption('select[data-a-target="birthday-date-input"]', '12');
    await page.selectOption('select[aria-label="Select your birthday year"]', '1994');
    await page.locator('button[data-a-target="signup-phone-email-toggle"]').click();
    await page.locator('input#email-input').pressSequentially(generateRandomEmail(), { delay: 40 });
    await page.locator('button[data-a-target="passport-signup-button"]').click();

    expect(await page.locator('text=Enter your verification code').isVisible()).toBeTruthy();
});
