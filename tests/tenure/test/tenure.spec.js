const { test, expect, chromium } = require('@playwright/test');
const LoginPage = require('../../login/pages/loginPage.js');
const TenureLanding = require('../pages/tenureLanding.js');
const selector = require('../components/tenureComponents.js');
const config = require('../../../test-data/config.json');

let browser;
let context;
let page;

test.describe('Tenure Test Cases', () => {

  // Before all tests, create a browser context and a page, then log in
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.login('dashboard');

    const tenureLanding = new TenureLanding(page);
    await tenureLanding.switchToTenureModule();
  });

  // After all tests, close the browser context
  test.afterAll(async () => {
    await context.close();
    await browser.close();
  });

  test('Verify Tenure Landing Page', async () => {
    try {
      // Wait for the people list tab to be visible and verify the correct URL
      await page.waitForSelector(selector.peopleListTab);
      await expect(page).toHaveURL(config.TenureURL);
    } catch (err) {
      console.error(err);
      throw err;
    }
  });

  test('Tenure People Page Export', async () => {
    try {
      const tenureLanding = new TenureLanding(page);

      // Wait for people list tab and begin the export flow
      await page.waitForSelector(selector.peopleListTab);
      await page.locator(selector.peopleListTab).click();

      await page.waitForSelector(selector.exportIcon);
      await page.locator(selector.exportIcon).click();
      await page.waitForSelector(selector.exportFilteredEmployeesOption);
      await page.locator(selector.exportFilteredEmployeesOption).click();

      await page.waitForSelector(selector.nextButton);
      await page.locator(selector.nextButton).click();
      await page.locator(selector.nextButton).click(); // Click next twice

      await page.waitForSelector(selector.exportButton);
      await page.locator(selector.exportButton).click();

      // Check that the export completed successfully (toast message is visible)
      const toastVisible = await tenureLanding.isToastVisible();
      expect(toastVisible).toBeTruthy();
      
      // Optionally, check CSV headers
      // await checkCsvHeaders();
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
});
