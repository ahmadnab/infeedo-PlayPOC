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

    const latest_added_note =  String(await peopleTable.chatActionBasedOnType('touchpoint_note', content, page)).trim();
    const note_touchpoint =  await page.locator(commonSelectors.peopleList.note_metaData_noteType).textContent();
    const note_date =  await page.locator(commonSelectors.peopleList.note_metaData_Date).textContent();
    const moduleData = {content: latest_added_note, touchpoint: note_touchpoint, date: note_date};

    const isMatching = common.compareData(expectedData, moduleData);
    
    expect(isMatching).toBeTruthy();
  })
});
