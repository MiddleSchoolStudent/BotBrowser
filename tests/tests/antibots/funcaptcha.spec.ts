import { expect, test } from '../global-setup';
import { sleep, waitForFrame } from '../utils';

test('blizzard', async ({ page }) => {
    await page.goto(`https://account.battle.net/creation/flow/creation-full`);
    await page.locator('input[name="dob-plain"]').focus();
    await page.keyboard.type('01/01/1998', { delay: 20 });
    await page.locator('button#flow-form-submit-btn').click();
    await page.locator('input#capture-first-name').pressSequentially(Math.random().toString(36).substring(5), {
        delay: 20,
    });
    await page.locator('input#capture-last-name').pressSequentially(Math.random().toString(36).substring(5), {
        delay: 20,
    });
    await page.locator('button#flow-form-submit-btn').click();
    await page
        .locator('input#capture-email')
        .pressSequentially(
            Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + '@gmail.com',
            { delay: 20 }
        );
    await page.locator('button#flow-form-submit-btn').click();
    await page.locator('span >> text=By checking this box').click();
    await page.locator('button#flow-form-submit-btn').click();
    await page
        .locator('input#capture-password')
        .pressSequentially(Math.random().toString(36).substring(2) + Math.random().toString(36).substring(5) + 'AC?_', {
            delay: 20,
        });
    await page.locator('button#flow-form-submit-btn').click();
    await page.locator('button#flow-form-submit-btn').click();

    const fcFrame = await waitForFrame({
        page,
        url: 'https://blizzard-api.arkoselabs.com/fc/assets/ec-game-core',
    });
    await fcFrame.locator('button[data-theme="home.verifyButton"]').click();
    await page.waitForSelector('div.step-icon--success');
});

test('roblox', async ({ page }) => {
    await page.goto(`https://www.roblox.com/`);
    await page.locator('select#MonthDropdown').selectOption('Jan');
    await page.locator('select#DayDropdown').selectOption('01');
    await page.locator('select#YearDropdown').selectOption('1998');
    await page.locator('input#signup-username').pressSequentially(Math.random().toString(36).substring(5), {
        delay: 20,
    });
    await page.locator('input#signup-password').pressSequentially(Math.random().toString(36).substring(5) + 'AC_?', {
        delay: 20,
    });

    await page.locator('button#signup-button').click();
    await page.waitForNavigation({ url: 'https://www.roblox.com/home' });
});

test('hotmail', async ({ page }) => {
    await page.goto(`https://signup.live.com/signup`);
    await page.locator('span#liveSwitch').click();
    await page.locator('select#domainSelect').selectOption({
        value: 'hotmail.com',
    });

    const username =
        Math.random().toString(36).substring(2).replace(/^\d+/g, '') + Math.random().toString(36).substring(2);
    const password = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(5) + 'AC?_';

    await page.locator('input#usernameInput').pressSequentially(username, {
        delay: 20,
    });
    await page.keyboard.press('Enter');
    await page.locator('input#Password').pressSequentially(password, {
        delay: 20,
    });
    await page.keyboard.press('Enter');

    await page.locator('input#firstNameInput').pressSequentially(
        Math.random()
            .toString(36)
            .substring(2)
            .replace(/[^a-zA-Z]/g, ''),
        { delay: 20 }
    );
    await page.locator('input#lastNameInput').pressSequentially(
        Math.random()
            .toString(36)
            .substring(2)
            .replace(/[^a-zA-Z]/g, ''),
        { delay: 20 }
    );
    await page.keyboard.press('Enter');

    await page.locator('select#BirthMonth').selectOption({
        value: '1',
    });
    await page.locator('select#BirthDay').selectOption({
        value: '1',
    });
    await page.locator('input#BirthYear').pressSequentially('1998', {
        delay: 20,
    });
    await sleep(2000);
    await page.locator('button#nextButton').click();

    await page
        .locator('[data-testid="enforcementFrame"]')
        .contentFrame()
        .locator('iframe[title="Verification challenge"]')
        .contentFrame()
        .locator('iframe[title="Visual challenge"]')
        .contentFrame()
        .getByRole('button', { name: 'Solve puzzle' })
        .click();

    expect(
        await page
            .locator('[data-testid="enforcementFrame"]')
            .contentFrame()
            .locator('iframe[title="Verification challenge"]')
            .contentFrame()
            .locator('iframe[title="Visual challenge"]')
            .contentFrame()
            .getByText('(1 of 1)') // It means we have a great environment with only one wave.
            .elementHandle()
    ).toBeTruthy();
});
