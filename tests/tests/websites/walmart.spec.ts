import { test } from '../global-setup';

test('walmart', async ({ page }) => {
    await page.goto(
        'https://www.walmart.com/ip/FCMP-Outdoor-RC4000-50-Gallon-Outdoor-Rain-Water-Catcher-Barrel-Black/975348804'
    );
});
