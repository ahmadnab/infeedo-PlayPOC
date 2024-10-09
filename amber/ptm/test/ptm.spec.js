const { test, expect, chromium } = require('@playwright/test');
const LoginPage = require('../../login/pages/loginPage');
const PTM = require('../pages/ptm');
const common = require('../../../reusable/common');

let browser;
let context;
let page;

test.describe('PTM Test Cases', () => {

  // Before all tests, create a browser context and a page, then log in
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.login('dashboard');

    const ptm_obj = new PTM(page);
    await ptm_obj.switchToPtmModule();
  });

  // After all tests, close the browser context
  test.afterAll(async () => {
    await context.close();
    await browser.close();
  });

  test('Verify Tenure and PTM case Count', async () => {
        const ptm_obj = new PTM(page);
        await ptm_obj.switchPtmTab('analytics');
        await ptm_obj.applyTouchpointFilterBasisModule('tenure');
        const ptmModuleCaseCount = await ptm_obj.getCaseCount();
        const tenureExpectedPTMCaseCount = await common.getPTMCounts(page, 'tenure');
        const isMatching = common.compareData(ptmModuleCaseCount, tenureExpectedPTMCaseCount);
        expect(isMatching).toBeTruthy();
  });

  test('Verify PTM case count with Trend Graph Export', async()=>{
    try {
      const ptm_obj = new PTM(page);
      await ptm_obj.switchPtmTab('analytics');
      await ptm_obj.trendGraphTabForCSA();
      const targetPath = await common.exportTrendGraph(page, 'ptm-case-analysis-container');
      const moduleData = await ptm_obj.processTrendGraphExport(targetPath);
      const expectedData = await ptm_obj.getCaseCount();
      const isMatching = common.compareData(moduleData, expectedData);
      expect(isMatching).toBeTruthy();

      common.cleanUpDownload(targetPath);
    } 
    catch (err) {
      console.error(err);
      throw err;
    }
  });

  test('Verify aging numbers on PTM Analytics Page', async()=>{
    const ptm_obj = new PTM(page);
    await ptm_obj.switchPtmTab('analytics');
    const moduleData = await ptm_obj.getCaseCount(true);
    const expectedData = await ptm_obj.getAgingCaseCount();
    const isMatching = common.compareData(moduleData, expectedData);
    expect(isMatching).toBeTruthy();
  });

});
