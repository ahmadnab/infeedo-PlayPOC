const { test, expect, devices } = require('@playwright/test');
const selector = require('../components/loginComponents.js');
const LoginPage = require('../pages/loginPage.js');
const loginData = require('../../../test-data/loginData.json');
const config = require('../../../test-data/config.json');


test.describe.parallel('Login Tests for Different Regions', () => {
  for (const [region, data] of Object.entries(loginData)) {
    test(`Login Test for ${region} Region`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('https://www.infeedo.com/login');
      await page.waitForTimeout(2000);
      await loginPage.enterEmail(data.email);
      await loginPage.enterPassword(data.password);
      await loginPage.clickLogin();

      // Wait for the navigation to finish or error message to appear
      await page.waitForURL().catch(() => null);
      const errorVisible = await loginPage.isErrorToastVisible();

      if (errorVisible) {
        // Take a screenshot if login fails
        await loginPage.takeScreenshot(`${region}-login-failure`);
        expect(errorVisible).toBeFalsy(); // Fail the test if error is visible
      } else {
        await expect(page).toHaveURL(/.*beta\.amber\.infeedo\.com\/dashboard/, { timeout: 20000 });

      }
    });
  }

  test.describe('Amber Chatbot Mobile View Tests', () => {

    test('Login and switch between modules in mobile view (iPhone 12)', async ({ browser }) => {
      // Create a new browser context with iPhone 12 configuration
      const iPhone12 = devices['iPhone 12'];
      const context = await browser.newContext({
          ...iPhone12, // Apply the iPhone 12 viewport and user agent
      });
  
      // Create a new page in the context
      const page = await context.newPage();        
  
      const loginPage = new LoginPage(page);
      await loginPage.login('chat');
      
      // Validate that the URL has changed to the chat URL
      await expect(page).toHaveURL(config.url.chatBaseURL);
  
      // Interact with page elements in mobile view
      await loginPage.navigateToAB();
      
      // Take another screenshot for verification
      await page.screenshot({ path: './screenshots/screenshotAnonymous.png' });
      await expect(page).toHaveURL(config.url.anonymousBatURL);
      
      // Navigate to another module
      await loginPage.navigateToAIA();
      await page.screenshot({ path: './screenshots/screenshotAI.png' });
      await expect(page).toHaveURL(config.url.aiAssistURL);
  
      // Close the context
      await context.close();
  });
});
});
