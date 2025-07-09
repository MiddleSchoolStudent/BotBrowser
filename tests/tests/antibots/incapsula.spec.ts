import { expect, test } from '../global-setup';
import { getDateFormatted } from '../utils';

test('copaair', async ({ page }) => {
    const tomorrowDate = getDateFormatted(1);

    const apiResponsePromise = page.waitForResponse((response) =>
        response.url().startsWith('https://api.copaair.com/ibe/booking/plan')
    );
    await page.goto(
        `https://shopping.copaair.com/?roundtrip=false&area1=BAQ&area2=BDL&date1=${tomorrowDate}&date2=&flexible_dates_v2=false&adults=1&children=0&infants=0&isMiles=false&advanced_air_search=false&stopover=false&langid=en&promocode=`
    );

    const apiResponse = await apiResponsePromise;
    expect(apiResponse.status()).toBe(200);
});

test('tarom', async ({ page }) => {
    const futureDate = getDateFormatted(1);
    await page.goto(
        `https://digital.tarom.ro/booking?lang=en-GB&search=%7B%22travelers%22%3A%5B%7B%22passengerTypeCode%22%3A%22ADT%22%7D%5D%2C%22commercialFareFamilies%22%3A%5B%22EUROPE%22%5D%2C%22itineraries%22%3A%5B%7B%22departureDateTime%22%3A%22${futureDate}%22%2C%22originLocationCode%22%3A%22LCG%22%2C%22destinationLocationCode%22%3A%22OTP%22%7D%5D%7D&portalFacts=%5B%7B%22key%22%3A%22currency%22%2C%22value%22%3A%22EUR%22%7D%2C%7B%22key%22%3A%22channel%22%2C%22value%22%3A%22desktop%22%7D%5D`
    );
    const apiResponse = await page.waitForResponse(
        (response) =>
            response.request().method() === 'POST' &&
            response.url().includes('https://api-des.tarom.ro/v2/search/air-bounds') &&
            response.status() === 200
    );
    expect(apiResponse.status()).toBe(200);
});
