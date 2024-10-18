const { test, expect, chromium } = require('@playwright/test');
const LoginPage = require('../../login/pages/loginPage');
const ReportStudio = require('../pages/reportStudio');
const Tenure = require('../../tenure/pages/tenure');
const common = require('../../../reusable/common');


let browser;
let context;
let page;

test.describe('Report Studio Summary Slides Test Cases', () => {

  // Before all tests, create a browser context and a page, then log in
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }, // Desktop viewport size
      isMobile: false,
    });    
    page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.login('dashboard');

    const report_obj = new ReportStudio(page, 'tenure');
    await report_obj.switchToReportStudio();
  });

  // After all tests, close the browser context
  test.afterAll(async () => {
    await context.close();
  });

  test('Verify Tenure and Response Rate Summary Count', async () => {
        const tenureTemplateName = 'Annual Tenure Report (Summary)';
        const report_obj = new ReportStudio(page, 'tenure');
        const reportURL = await report_obj.createReportFromTemplates(tenureTemplateName);
        const rrSummaryData = await report_obj.extractDataFromReportSlide(reportURL, 'response-rate-summary');
        const tenure_obj = new Tenure(page);
        await tenure_obj.switchToTenureModule();
        const dashboardData = await tenure_obj.getResponseRateSummaryData();
        const isMatching = common.compareData(rrSummaryData, dashboardData);
        expect(isMatching).toBeTruthy();
  });

});
