const {expect} = require('@playwright/test');
const config = require('../../../test-data/config.json');
const selector = require('../components/tenureComponents.js');

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
}

module.exports = Tenure;