import { expect, test } from '../global-setup';

test('test Kasada', async ({ page }) => {
    await page.goto('https://www.kick.com');

    // click on the sign up button
    await Promise.race([
        // cloudflare: click: Verify you are human
        page
            .waitForSelector('text=Verify you are human')
            .then((el) => el.click()),
        // Sign Up: click: text=Sign Up
        await page.waitForSelector('text=Sign Up').then((el) => el.click()),
    ]);

    // type in random email
    await page
        .locator('input[name="email"]')
        .fill(
            Math.random().toString(36).substring(2) +
                Math.random().toString(36).substring(2) +
                '@gmail.com',
        );

    // type in random birthdate
    await page.locator('input[name="birthdate"]').fill('1995-01-01');

    // type in random username
    await page
        .locator('input[name="username"]')
        .fill(Math.random().toString(36).substring(2));

    // type in random password
    await page
        .locator('input[name="password"]')
        .fill(
            Math.random().toString(36).substring(2) +
                Math.random().toString(36).substring(5) +
                'AC?_',
        );

    // click on the sign up button
    await page.locator('button[type="submit"] >> text=Sign Up').click();

    // wait for "Email Verification" text to appear
    expect(await page.waitForSelector('text=Email Verification')).toBeTruthy();
});
