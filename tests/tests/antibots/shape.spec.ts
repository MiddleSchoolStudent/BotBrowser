import { expect, test } from '../global-setup';
import { getDateFormatted, sleep } from '../utils';

test('southwest', async ({ page }) => {
    const tomorrowDate = getDateFormatted(1);

    const apiResponsePromise = page.waitForResponse((response) =>
        response.url().endsWith('/air-booking/page/air/booking/shopping')
    );
    await page.goto(
        `https://www.southwest.com/air/booking/select-depart.html?int=HOMEQBOMAIR&adultPassengersCount=1&departureDate=${tomorrowDate}&destinationAirportCode=LGA&fareType=USD&originationAirportCode=ATL&passengerType=ADULT&promoCode=&returnDate=&tripType=oneway&from=ATL&to=LGA&adultsCount=1&departureTimeOfDay=ALL_DAY&reset=true&returnTimeOfDay=ALL_DAY`
    );

    const apiResponse = await apiResponsePromise;
    const apiResponseJson = await apiResponse.json();

    expect(apiResponseJson).toHaveProperty('data');
});

test('target', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.locator('a#account-sign-in').click();
    await page.locator('button >> text=Sign in or create account').click();
    await page.locator('input#username').pressSequentially(Math.random().toString(36).substring(2) + '@gmail.com', {
        delay: 20,
    });
    await page.keyboard.press('Enter');
    await page.locator('input#firstname').pressSequentially(
        Math.random()
            .toString(36)
            .substring(2)
            .replace(/[^a-zA-Z]/g, ''),
        { delay: 20 }
    );
    await page.locator('input#lastname').pressSequentially(
        Math.random()
            .toString(36)
            .substring(2)
            .replace(/[^a-zA-Z]/g, ''),
        { delay: 20 }
    );
    await page.locator('input#password-checkbox').click();
    await page.locator('input#password').pressSequentially(Math.random().toString(36).substring(2) + 'AC?_', {
        delay: 20,
    });
    await sleep(2000);
    await page.locator('button#createAccount').click();
    await page.locator('h1 >> text=Verification code sent').waitFor();
});
