import { test, expect } from '@playwright/test';

test.describe('Testy E2E - Strona Główna', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://wellbee.pl/');

        const cookieAcceptBtn = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        const cookieOverlay = page.locator('#CybotCookiebotDialogBodyUnderlay');

        try {
            await cookieAcceptBtn.waitFor({ state: 'visible', timeout: 3000 });
            await cookieAcceptBtn.click({ force: true });
            await cookieOverlay.waitFor({ state: 'hidden', timeout: 5000 });
            await page.waitForTimeout(500);
        } catch (e) {
        }
        await page.waitForLoadState('domcontentloaded');
    });

    test('powinien przekierować do listy specjalistów po kliknięciu w kategorię "Emocje"', async ({ page }) => {
        const emotionLink = page.locator('a[href*="serviceAreaCategory=1"]').first();

        await emotionLink.scrollIntoViewIfNeeded();
        await emotionLink.click({ force: true });

        await expect(page).toHaveURL(/.*serviceAreaCategory=1/);
    });

    test('powinien przesuwać karuzelę terapeutów po kliknięciu strzałki', async ({ page }) => {
        const nextSlideBtn = page.locator('button[aria-label="Przycisk w prawo"]').first();
        const slickTrack = page.locator('.slick-track').first();

        await nextSlideBtn.scrollIntoViewIfNeeded();
        const initialStyle = await slickTrack.getAttribute('style');

        await nextSlideBtn.click({ force: true });

        await expect(slickTrack).not.toHaveAttribute('style', initialStyle || '', { timeout: 5000 });
    });

    test('powinien poprawnie wysłać dane z formularza newslettera (weryfikacja API)', async ({ page }) => {
        await page.route('**/api/**', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true })
            });
        });

        const requestPromise = page.waitForRequest(request =>
            request.method() === 'POST' && request.url().includes('/api')
        );

        const newsletterForm = page.locator('form').first();

        await newsletterForm.locator('input[name="name"]').fill('E2E Tester');
        await newsletterForm.locator('input[name="email"]').fill('e2e.test@wellbee.pl');

        await newsletterForm.locator('label').filter({ hasText: 'Polityką Prywatności' }).click();
        await newsletterForm.locator('label').filter({ hasText: 'Wyrażam zgodę na przesyłanie' }).click();

        await newsletterForm.locator('button[type="submit"]:has-text("Zapisuję się!")').click({ force: true });

        const request = await requestPromise;
        expect(request.method()).toBe('POST');
    });

});


test.describe('Testy E2E Lista Specjalistów (Wyszukiwarka Terapeutów)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://wellbee.pl/nasi-specjalisci');

        const cookieAcceptBtn = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        const cookieOverlay = page.locator('#CybotCookiebotDialogBodyUnderlay');

        try {
            await cookieAcceptBtn.waitFor({ state: 'visible', timeout: 3000 });
            await cookieAcceptBtn.click({ force: true });
            await cookieOverlay.waitFor({ state: 'hidden', timeout: 5000 });
            await page.waitForTimeout(500);
        } catch (e) {
        }
    });

    test('powinien przełączać kategorie problemów (np. "Relacje")', async ({ page }) => {
        const relacjeTab = page.locator('.MuiTab-root', { hasText: 'Relacje' });

        await relacjeTab.click({ force: true });

        await expect(page).toHaveURL(/.*serviceAreaCategory=3/);

        await expect(page.locator('.MuiCard-root:has(h4)').first()).toBeVisible();
    });

    test('powinien dynamicznie przełączać filtry "Online" oraz "W gabinecie"', async ({ page }) => {
        const onlineFilterBtn = page.locator('[data-test="online-filter-button"]');
        const offlineFilterBtn = page.locator('[data-test="offline-filter-button"]');

        await expect(onlineFilterBtn).toHaveAttribute('aria-pressed', 'true');
        await expect(offlineFilterBtn).toHaveAttribute('aria-pressed', 'false');

        await offlineFilterBtn.click({ force: true });

        await expect(offlineFilterBtn).toHaveAttribute('aria-pressed', 'true');
        await expect(onlineFilterBtn).toHaveAttribute('aria-pressed', 'false');
    });

    test('powinien otwierać profil terapeuty po kliknięciu "Znajdź termin"', async ({ page }) => {
        const sessionLink = page.locator('a:has([data-test="book-session-button"])').first();
        const expectedHref = await sessionLink.getAttribute('href');

        await sessionLink.scrollIntoViewIfNeeded();

        await sessionLink.click({ force: true });

        const urlPattern = new RegExp(`.*${expectedHref}`);
        await expect(page).toHaveURL(urlPattern);
    });

    test('karta terapeuty powinna zawierać wszystkie wymagane dane i tagi kompetencji', async ({ page }) => {
        const firstTherapistCard = page.locator('.MuiCard-root:has(h4)').first();

        await expect(firstTherapistCard.locator('h4')).toBeVisible();

        const chips = firstTherapistCard.locator('.MuiChip-root');
        const chipsCount = await chips.count();
        expect(chipsCount).toBeGreaterThan(0);

        const priceTextLocator = firstTherapistCard.locator('[data-test="book-session-button"] > span:has-text("PLN")');
        await expect(priceTextLocator).toBeVisible();
    });

    test('rozwinięcie filtra "Specjalizacja" powinno pokazać interaktywne opcje', async ({ page }) => {
        const specializationBtn = page.locator('button:has-text("Specjalizacja")');
        await specializationBtn.click({ force: true });

        const popoverMenu = page.locator('.MuiPopover-root').last();

        await expect(popoverMenu).toBeVisible();
    });
});