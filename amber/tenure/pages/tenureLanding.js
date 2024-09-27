const {expect} = require('@playwright/test');
const config = require('../../../test-data/config.json');
const selector = require('../components/tenureComponents.js');

class NavigateToTenure{
    constructor(page){
        this.page = page;
    }

    async switchToTenureModule(){
        await this.page.waitForSelector(selector.sideMenu);
        await this.page.hover(selector.sideMenu); 
        await this.page.locator(selector.tenureModuleSelector).click();
        const url = config.url.TenureURL;
        await expect(this.page).toHaveURL(url);  
    }
    async isToastVisible() {
        try {
          await this.page.waitForSelector(selector.toastMessage, { timeout: 5000, state: 'visible' });
          return true;
        } catch (e) {
          return false;
        }
      }
}

module.exports = NavigateToTenure;