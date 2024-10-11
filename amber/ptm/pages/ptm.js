const {expect} = require('@playwright/test');
const config = require('../../../test-data/config.json');
const selector = require('../components/ptmComponents.js');
const fs = require('fs');
const csv = require('csv-parser');

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
                const regex = /^https:\/\/app\.infeedo\.com\/dashboard\/ptm\/analytics.*$/;
                expect(currentUrl).toMatch(regex);
                break;
            default:
                throw new Error('invalid tab name')
        }
    }

    /*
    TO DO: Add touchpoint filter capability for specific pulse and moment type
        When creating Test Case 1 for pulse and mtm for ptm case verification
    */

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

    async trendGraphTabForCSA(){
        await this.page.locator(selector.trendTabCSA).click();
        await this.page.waitForSelector(selector.trendCSA_timelineTabs);
        await this.page.locator(selector.cumulativeToggle).click();
    }

    /**
     * 
     * @param {*} is_aging - flag to get unresolved cases only for aging comparison
     * @returns {object} count of ptm cases
     */

    async getCaseCount(is_aging = false){
        const expiredCaseElement = selector.caseBreakdownElements.expiredElement;

        const totalCases = Number(await this.page.locator(selector.totalCaseElement).textContent());
        const openCases = Number(await this.page.locator(selector.caseBreakdownElements.openCaseElement).textContent());
        const inProgressCases = Number(await this.page.locator(selector.caseBreakdownElements.inProgressElement).textContent());
        const closedCases = Number(await this.page.locator(selector.caseBreakdownElements.closedCaseElement).textContent());
        const expiredCases = (await this.page.locator(expiredCaseElement).isVisible()) ? Number(this.page.locator(expiredCaseElement).textContent()) : 0;

        if (is_aging) 
                return {
                    openCases, inProgressCases
                }
            else 
                return {
                    totalCases, openCases, inProgressCases, closedCases, expiredCases
                }
    }

    async processTrendGraphExport(targetPath) {
        return new Promise((resolve, reject) => {
            let totalPTMOpen = 0;
            let openCases = 0;
            let inProgressCases = 0;
            let closedCases = 0;
            let expiredCases = 0;
    
            fs.createReadStream(targetPath)
                .pipe(csv())
                .on('data', (row) => {
                    openCases += parseInt(row['Open'], 10) || 0;
                    inProgressCases += parseInt(row['In-Progress'], 10) || 0;
                    closedCases += parseInt(row['Closed'], 10) || 0;
    
                    if ('Expired' in row) {
                        expiredCases += parseInt(row['Expired'], 10) || 0;
                    }
                    else {
                        expiredCases = 0
                    }
                })
                .on('end', () => {
                    const totalCases = openCases + inProgressCases + closedCases + expiredCases;

                    resolve({totalCases, openCases, inProgressCases,
                                closedCases, expiredCases });
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    async getAgingCaseCount(){
        const openCases = Number (await this.page.locator(selector.agingOpenCase).textContent());
        const inProgressCases = Number (await this.page.locator(selector.agingInProgressCase).textContent());

        return {openCases, inProgressCases}
    }
}


module.exports = PTM;