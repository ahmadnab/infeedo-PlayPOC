const {expect} = require('@playwright/test');
const selector = require('../components/highlightComponents.js');
const config = require('../../../test-data/config.json')


class NavigateToYesterdayHighlights{
    constructor(page){
        this.page = page;
    
    }
    async getDetailsYesterdayHighlights(){
        try{
            // await this.page.waitForSelector(selector.sideMenu);
            // await page.hover(selector.sideMenu); 
            await this.page.locator(selector.highlightModuleSelector).click();
            const url = config.YesterdayHighlightsURL;
            await expect(this.page).toHaveURL(url);  
        }
        catch(err){
            console.error(err);
            throw err;
        }  

    }


    }

    module.exports = NavigateToYesterdayHighlights;