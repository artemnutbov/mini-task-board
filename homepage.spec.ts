import { test, expect } from '@playwright/test';

test.describe('Wellbee Homepage Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://wellbee.pl/');

        const cookieAcceptBtn = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');

        try {
            await cookieAcceptBtn.waitFor({ state: 'visible', timeout: 3000 });
            await cookieAcceptBtn.click();
        } catch (error) {
        }
    });

    test('should display the main hero heading', async ({ page }) => {
        const mainHeading = page.locator('h2', {
            hasText: 'Najlepiej dopasowane wsparcie psychologiczne online'
        });
        await expect(mainHeading).toBeVisible();
    });

    test('should display login button with correct link', async ({ page }) => {
        const loginButton = page.locator('[data-test="login-button"]');

        await expect(loginButton).toBeVisible();
        await expect(loginButton).toHaveAttribute('href', '/panel-pacjenta/login');
    });

    test('should expand FAQ accordion on click', async ({ page }) => {
        const faqAccordion = page.locator('div[role="button"]:has-text("Czy mogę zrezygnować z psychoterapii w każdej chwili?")');

        await expect(faqAccordion).toHaveAttribute('aria-expanded', 'false');

        await faqAccordion.click({ force: true });

        await expect(faqAccordion).toHaveAttribute('aria-expanded', 'true');

        const faqContent = page.locator('text=Oczywiście, ale jeżeli zrobisz to później niż 24h przed rozpoczęciem');
        await expect(faqContent).toBeVisible();
    });

    test('should correctly fill out the newsletter form', async ({ page }) => {
        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');
        const submitButton = page.locator('button[type="submit"]:has-text("Zapisuję się!")');

        const privacyCheckbox = page.locator('input[type="checkbox"]').nth(0);
        const marketingCheckbox = page.locator('input[type="checkbox"]').nth(1);

        await nameInput.fill('Jan Kowalski');
        await emailInput.fill('jan.kowalski@example.com');
        await privacyCheckbox.check({ force: true });
        await marketingCheckbox.check({ force: true });

        await expect(nameInput).toHaveValue('Jan Kowalski');
        await expect(emailInput).toHaveValue('jan.kowalski@example.com');
        await expect(privacyCheckbox).toBeChecked();

        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
    });

    test('should contain a working "Znajdź specjalistę" button', async ({ page }) => {
        const bookSessionBtn = page.locator('[data-test="psycho-online-page"]').first();

        await expect(bookSessionBtn).toBeVisible();
        await expect(bookSessionBtn).toHaveText(/Umów sesję/);
        await expect(bookSessionBtn).toHaveAttribute('href', '/znajdz-terapeute');
    });
});