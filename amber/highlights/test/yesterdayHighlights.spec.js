const { test, expect, devices } = require('@playwright/test');
const selector = require('../../login/components/loginComponents.js');
 const LoginPage = require('../../login/pages/loginPage.js');
const NavigateToYesterdayHighlights = require('../pages/yesterdayHighlights')


test.describe('Verify Highlights are consistent with respective module', () => {
    test('Verify Highlights are consistent with respective module', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('dashboard');
        const navigateToYesterdayHighlights = new NavigateToYesterdayHighlights(page);
        await navigateToYesterdayHighlights.getDetailsYesterdayHighlights();
        await navigateToYesterdayHighlights.getDetailsYesterdayHighlightsData();
    
    });
    
});
