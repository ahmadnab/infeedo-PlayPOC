const { test, expect, chromium } = require('@playwright/test');
const LoginPage = require('../../login/pages/loginPage.js');
const Tenure = require('../pages/tenure.js');
const selector = require('../components/tenureComponents');
const peopleTable = require('../../../reusable/peopleTable');
const commonSelectors = require('../../../reusable/commonSelectors');
const common = require('../../../reusable/common.js');

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

    const tenure = new Tenure(page);
    await tenure.switchToTenureModule();
  });

  // After all tests, close the browser context
  test.afterAll(async () => {
    await context.close();
    await browser.close();
  });

  test('Tenure People Page Export', async () => {
    try {
      const tenure = new Tenure(page);
      await tenure.switchToPeopleList();
      await page.locator(selector.exportIcon).click();
      await page.waitForSelector(selector.exportFilteredEmployeesOption);
      await page.locator(selector.exportFilteredEmployeesOption).click();

      await page.waitForSelector(selector.nextButton);
      await page.locator(selector.nextButton).click();
      await page.locator(selector.nextButton).click(); // Click next twice

      await page.waitForSelector(selector.exportButton);
      await page.locator(selector.exportButton).click();

      // Check that the export completed successfully (toast message is visible)
      const toastVisible = await tenure.isToastVisible();
      expect(toastVisible).toBeTruthy();
      
      /*

      ToDo: Add export and csv verification for headers and row count 

      */
    } catch (err) {
      console.error(err);
      throw err;
    }
  });

test('Add & Verify Touchpoint Level Notes', async()=>{
    const tenure = new Tenure(page);
    await tenure.switchToPeopleList();
    await peopleTable.searchUser(page);

    const touchpoint =  await page.locator(commonSelectors.peopleList.touchpointRow).textContent();
    const content =  `Automation note: ${new Date().toLocaleString()}`;
    const formattedDate =  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const expectedData = {content: content, touchpoint: touchpoint, date: formattedDate};

    const moduleData =  await peopleTable.chatActionBasedOnType('touchpoint_note', content, page);

    const isMatching = common.compareData(moduleData, expectedData);
    expect(isMatching).toBeTruthy();

    const historyExpectedData = {
      date: formattedDate, touchpoint: touchpoint, 
          note: content 
    }
    const historyModuleData = await peopleTable.getHistoryData(page, 'notes');

    const isHostoryMatching = common.compareData(historyExpectedData, historyModuleData);
    expect(isHostoryMatching).toBeTruthy();
});

test('Add & Verify User Level Notes', async()=>{
  const tenure = new Tenure(page);
  await tenure.switchToPeopleList();
  await peopleTable.searchUser(page);

  const content =  `Automation User level note: ${new Date().toLocaleString()}`;
  const formattedDate =  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const noteTouchpoint = `User-level`;
  const expectedData = {content: content, touchpoint: noteTouchpoint, date: formattedDate};

  const moduleData =  await peopleTable.chatActionBasedOnType('user_note', content, page);

  const isMatching = common.compareData(moduleData, expectedData);
  expect(isMatching).toBeTruthy();


  const historyTouchpoint = `added an user-level note`;
  const historyExpectedData = {
    date: formattedDate, touchpoint: historyTouchpoint, 
        note: content 
  }
  const historyModuleData = await peopleTable.getHistoryData(page, 'notes', 'userLevel');

  const isHostoryMatching = common.compareData(historyExpectedData, historyModuleData);
  expect(isHostoryMatching).toBeTruthy();
});

});
