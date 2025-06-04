import { test } from '../global-setup';
import { generateRandomEmail, generateRandomPassword, generateRandomUsername } from '../utils';

test('signup', async ({ page }) => {
    await test.setTimeout(0);
    await page.goto('https://www.instagram.com/accounts/emailsignup/');
    await page.locator('input[name="emailOrPhone"]').pressSequentially(generateRandomEmail(), {
        delay: 100,
    });
    await page.locator('input[name="password"]').pressSequentially(generateRandomPassword(), {
        delay: 100,
    });
    await page
        .locator('input[name="fullName"]')
        .pressSequentially(generateRandomUsername() + ' ' + generateRandomUsername(), {
            delay: 100,
        });
    await page.locator('input[name="username"]').pressSequentially(generateRandomUsername(), {
        delay: 100,
    });
    await page.locator('button >> text=Sign up').click();
    await page.locator('select[title="Month:"]').selectOption('1');
    await page.locator('select[title="Day:"]').selectOption('1');
    await page.locator('select[title="Year:"]').selectOption('1999');
    await page.locator('button >> text=Next').click();
    await page.locator('span >> text=Enter Confirmation Code').waitFor({
        state: 'visible',
    });
    await page.locator('input[name="email_confirmation_code"]').pressSequentially('123456', {
        delay: 100,
    });
    await page.locator('div >> text=Next').click();
    await page.locator('span >> text=You can request a new one').waitFor({
        state: 'visible',
    });
});
