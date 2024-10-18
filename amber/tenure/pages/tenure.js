const {expect} = require('@playwright/test');
const config = require('../../../test-data/config.json');
const selector = require('../components/tenureComponents.js');
const common = require('../../../reusable/common.js')

class Tenure{
    constructor(page){
        this.page = page;
    }

    async switchToTenureModule(){
        await this.page.waitForSelector(selector.sideMenu);
        await this.page.hover(selector.sideMenu); 
        await this.page.locator(selector.tenureModuleSelector).click();
        await this.page.waitForSelector(selector.peopleListTab);
        const url = config.url.TenureURL;
        await expect(this.page).toHaveURL(url);
    }

    async isToastVisible() {
          await this.page.waitForSelector(selector.toastMessage, { timeout: 5000, state: 'visible' });
          return true;
        }

    async switchToPeopleList(){
      await this.page.waitForSelector(selector.peopleListTab);
      await this.page.locator(selector.peopleListTab).click();
      await this.page.waitForSelector(selector.exportIcon);
      const url = config.url.tenurePeopleListURL;
      await expect(this.page).toHaveURL(url);
    }

    async getResponseRateSummaryData() {
        await this.page.locator(selector.card_metrics.rr_card_metrics).click();
        await page.waitForSelector('your-selector', { state: 'visible' });
        const response_rate = await this.page.locator(selector.responseRate_innerPage.rrArcNumber).textContent();
        const rrDeltaText = await this.page.locator(selector.responseRate_innerPage.rrArcDelta).textContent();
        const completedChatText = await this.page.locator(selector.responseRate_innerPage.completed).textContent();
        const droppedChatText = await this.page.locator(selector.responseRate_innerPage.dropped).textContent();
        const toStartChatText =await this.page.locator(selector.responseRate_innerPage.toStart).textContent();

        const rrDelta = common.extractAllNumbers(rrDeltaText);
        const completedChat = common.extractAllNumbers(completedChatText);
        const droppedChat = common.extractAllNumbers(droppedChatText);
        const toStartChat = common.extractAllNumbers(toStartChatText);

        return {
            response_rate, rrDelta, completedChat, droppedChat, toStartChat 
        } 
    }
    
}

module.exports = Tenure;