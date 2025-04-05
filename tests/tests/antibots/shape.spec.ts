import { expect, test } from '../global-setup';
import { getDateFormatted } from '../utils';

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
