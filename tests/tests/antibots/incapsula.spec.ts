import { expect, test } from '../global-setup';
import { getDateFormatted } from '../utils';

test('test Incapsula (copaair.com)', async ({ page }) => {
    const tomorrowDate = getDateFormatted(1);

    const apiResponsePromise = page.waitForResponse((response) =>
        response.url().startsWith('https://api.copaair.com/ibe/booking/plan'),
    );
    await page.goto(
        `https://shopping.copaair.com/?roundtrip=false&area1=BAQ&area2=BDL&date1=${tomorrowDate}&date2=&flexible_dates_v2=false&adults=1&children=0&infants=0&isMiles=false&advanced_air_search=false&stopover=false&langid=en&promocode=`,
    );

    const response = await apiResponsePromise;
    expect(response.status()).toBe(200);
});
