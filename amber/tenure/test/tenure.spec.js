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

    const touchpoint =  String(await page.locator(commonSelectors.peopleList.touchpointRow).textContent()).trim();
    const content =  `Automation note: ${new Date().toLocaleString()}`;
    const formattedDate =  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const expectedData = {content: content, touchpoint: touchpoint, date: formattedDate};

    const moduleData =  await peopleTable.chatActionBasedOnType('touchpoint_note', page, content);

    const isMatching = common.compareData(moduleData, expectedData);
    expect(isMatching).toBeTruthy();

    const historyExpectedData = {
      date: formattedDate, touchpoint: touchpoint, 
          note: content 
    }
    const historyModuleData = await peopleTable.getHistoryData(page, 'notes');

    const isHostoryMatching = common.compareData(historyModuleData, historyExpectedData);
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

  const moduleData =  await peopleTable.chatActionBasedOnType('user_note', page, content);

  const isMatching = common.compareData(moduleData, expectedData);
  expect(isMatching).toBeTruthy();

  const historyUserLevelText = `added an user-level note`;
  const historyExpectedData = {
    date: formattedDate, touchpoint: historyUserLevelText, 
        note: content 
  }
  const historyModuleData = await peopleTable.getHistoryData(page, 'notes', 'userLevel');

  const isHistoryMatching = common.compareData(historyModuleData, historyExpectedData);
  expect(isHistoryMatching).toBeTruthy();
});

test('Add & Remove Tenure Chat From PTM', async()=>{
  const tenure = new Tenure(page);
  await tenure.switchToPeopleList();
  await peopleTable.searchUser(page);
  const content = `Adding to PTM by automation`
  const status = await peopleTable.chatActionBasedOnType('addToPTM', page, content);
  
  expect(status).toBe('Open');

  const touchpoint =  String(await page.locator(commonSelectors.peopleList.touchpointRow).textContent()).trim();
  const formattedDate =  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const historyExpectedData = {
    date: formattedDate, touchpoint: touchpoint , risk: 'Medium risk', reason: content
  }
  const historyModuleData = await peopleTable.getHistoryData(page, 'addPtm');
  const isHistoryMatching = common.compareData(historyModuleData, historyExpectedData);
  expect(isHistoryMatching).toBeTruthy();

  const removeContent = `Removing from PTM by automation`
  await peopleTable.chatActionBasedOnType('removePtm', page, removeContent);

  const historyExpectedRemovePTM_Data = {
    date: formattedDate, touchpoint: touchpoint, reason: removeContent
  };
  const historyModuleRemovePTM_Data = await peopleTable.getHistoryData(page, 'removePtm');

  const isRemovePTM_HistoryMatching = common.compareData(historyModuleRemovePTM_Data, historyExpectedRemovePTM_Data);
  expect(isRemovePTM_HistoryMatching).toBeTruthy();
});

});