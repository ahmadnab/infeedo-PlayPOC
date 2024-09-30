const {expect} = require('@playwright/test');
const config = require('../../../test-data/config.json');
const selector = require('../components/ptmComponents.js');

class PTM{
    constructor(page){
        this.page = page
    }
    async switchToPtmModule(){
        await this.page.waitForSelector(selector.sideMenu);
        await this.page.hover(selector.sideMenu); 
        await this.page.locator(selector.ptmModuleSelector).click();
        const url = config.url.ptmListURL;
        await expect(this.page).toHaveURL(url);         //default landing page flag for ptm is to ptm list
    }

    async switchPtmTab(tab_name){
        tab_name = tab_name.toLowerCase();
        switch (tab_name) {
            case 'list':
                await this.page.locator(selector.ptmListTab).click();
                await this.page.waitForSelector(selector.ptmListTab);
                const listUrl = config.url.ptmListURL;
                await expect(this.page).toHaveURL(`${listUrl}`);  
                break;
            case 'analytics':
                await this.page.locator(selector.ptmAnalyticsTab).click();
                await this.page.waitForSelector(selector.ptmAnalyticsTab);
                const currentUrl = await this.page.url();
                const regex = /^https:\/\/beta\.amber\.infeedo\.com\/dashboard\/ptm\/analytics.*$/;
                expect(currentUrl).toMatch(regex);
                break;
            default:
                throw new Error('invalid tab name')
        }
    }

    async applyTouchpointFilterBasisModule(module_name, option = {}){
        switch (module_name) {
            case 'tenure':
                await this.page.locator(selector.ptmSourceDropdown).click();
                await this.page.locator(selector.ptmSourceTenureOption).click();
                await this.page.locator(selector.ptmSourceApplyButton).click();
                await this.page.waitForSelector(selector.totalCaseElement);
                break;
        
            case 'pulse':
                
                break;

            case 'mtm':
                
                break;
            default:
                break;
        }
    }

    async getCaseCount(){
        const expiredCaseElement = selector.caseBreakdownElements.expiredElement;

        const totalCases = Number(await this.page.locator(selector.totalCaseElement).textContent());
        const openCases = Number(await this.page.locator(selector.caseBreakdownElements.openCaseElement).textContent());
        const inProgressCases = Number(await this.page.locator(selector.caseBreakdownElements.inProgressElement).textContent());
        const closedCases = Number(await this.page.locator(selector.caseBreakdownElements.closedCaseElement).textContent());
        const expiredCases = (await this.page.locator(expiredCaseElement).isVisible()) ? Number(this.page.locator(expiredCaseElement).textContent()) : 0;
        return {
            totalCases, openCases, inProgressCases, closedCases, expiredCases
        }
    }
}


module.exports = PTM;