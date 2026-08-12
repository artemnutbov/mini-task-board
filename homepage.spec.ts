import { test, expect } from '@playwright/test';

test.describe('Wellbee Homepage Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://wellbee.pl/');
    });

    test('should display the main hero heading', async ({ page }) => {
        const mainHeading = page.getByRole('heading', {
            name: 'Najlepiej dopasowane wsparcie psychologiczne online',
            level: 2
        });

        await expect(mainHeading).toBeVisible();
    });

    test('login button should be visible and have correct link', async ({ page }) => {
        const loginButton = page.getByRole('link', { name: 'Zaloguj' }).first();

        await expect(loginButton).toBeVisible();
        await expect(loginButton).toHaveAttribute('href', '/panel-pacjenta/login');
    });

    test('should expand FAQ accordion on click', async ({ page }) => {
        const faqAccordion = page.getByRole('button', { name: /Czy mogę zrezygnować z psychoterapii w każdej chwili/i });

        await expect(faqAccordion).toHaveAttribute('aria-expanded', 'false');

        await faqAccordion.click();

        await expect(faqAccordion).toHaveAttribute('aria-expanded', 'true');

        const faqContent = page.getByText('Oczywiście, ale jeżeli zrobisz to później niż 24h przed rozpoczęciem');
        await expect(faqContent).toBeVisible();
    });

    test('should correctly fill out the newsletter form', async ({ page }) => {
        const nameInput = page.getByLabel('Imię');
        const emailInput = page.getByLabel('Adres e-mail');

        const privacyCheckbox = page.getByLabel(/Zapoznałem\/am się z Polityką Prywatności/);
        const marketingCheckbox = page.getByLabel(/Wyrażam zgodę na przesyłanie przez Wellbee/);

        const submitButton = page.getByRole('button', { name: 'Zapisuję się!' });

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

    test('should have a working "Umów sesję" hero button', async ({ page }) => {
        const bookSessionBtn = page.getByRole('link', { name: 'Umów sesję' }).first();

        await expect(bookSessionBtn).toBeVisible();
        await expect(bookSessionBtn).toHaveAttribute('href', '/znajdz-terapeute');
    });
});