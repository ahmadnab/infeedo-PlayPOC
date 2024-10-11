const {expect} = require('@playwright/test');
const selector = require('../components/highlightComponents.js');
const config = require('../../../test-data/config.json')
const Tenure = require('../../tenure/pages/tenure.js');



class NavigateToYesterdayHighlights{
    constructor(page){
        this.page = page;
    
    }

    async getDetailsYesterdayHighlights(){
        try{
            await this.page.waitForSelector(selector.sideMenu);
            await this.page.hover(selector.sideMenu); 
            await this.page.locator(selector.highlightModuleSelector).click();
            const url = config.YesterdayHighlightsURL;
            await expect(this.page).toHaveURL(url);  
        }
        catch(err){
            console.error(err);
            throw err;
        }  
    }
    async goToTenureHighlights(){
        try{
            await this.page.locator(selector.tenureHighlightsTab).click();
            await this.page.waitForSelector(selector.overallHeading, { state: 'visible' });
        }
        catch(err){
            console.error(err);
            throw err;
        }  
    }


    async getDataFromTenureHighlights(){
        try{
            let engagmentScoreaHighlightsValue=await this.page.locator(selector.engagmentScoresHighlights).textContent();
            var npsHighlightsValue = await this.page.locator(selector.npsHighlights).textContent();
            let moodScoreHighlightsValue = await this.page.locator(selector.moodScoreHighlights).textContent();
            let responseRateHighlightsValue = await this.page.locator(selector.responseRateHighlights).textContent();
            let totalPTMHighlightsValue = await this.page.locator(selector.totalPTMHighlights).textContent();
            let ESTextValue = await this.page.locator(selector.ESText).textContent();
            let NPSTextValue = await this.page.locator(selector.ESText).textContent();
            let MSTextValue = await this.page.locator(selector.ESText).textContent();
            let RRTextValue = await this.page.locator(selector.ESText).textContent();
            const params = {engagmentScoreaHighlightsValue,npsHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue};
            return params;
        }
        catch(err){
            console.error(err);
            throw err;
        }  
    }

    async getDetailsYesterdayHighlightsData(){
        try{
             await this.page.waitForSelector(selector.ptmCasesIdentifiedHeading, { state: 'visible' });
            const ptmCasesIdentifiedValue = await this.page.locator(selector.ptmCasesIdentified).textContent();
            const ptmCasesClosedValue = await this.page.locator(selector.ptmCasesClosed).textContent();
            await this.goToTenureHighlights();
            const data = await this.getDataFromTenureHighlights();
            const {engagmentScoreaHighlightsValue,npsHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue} = data;
            await this.page.waitForSelector(selector.dateFilter, { state: 'visible' });
            await this.page.locator(selector.dateFilter).click();
            let startdateValue = await this.page.locator(selector.startDate).getAttribute('value');
            let enddateValue = await this.page.locator(selector.endDate).getAttribute('value');
            await this.page.locator(selector.cancelDateFilter).click();
            const tenure = new Tenure(this.page);
            await tenure.switchToTenureModule();
            const params ={ptmCasesIdentifiedValue,ptmCasesClosedValue,engagmentScoreaHighlightsValue,npsHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,startdateValue,enddateValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue}
              await this.getandValidateDetailsTenureData(params);
        }
        catch(err){
            console.error(err);
            throw err;
        }  
    }

     async getandValidateDetailsTenureData(params){
        const {ptmCasesIdentifiedValue,ptmCasesClosedValue,engagmentScoreaHighlightsValue,npsHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,startdateValue,enddateValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue} =params;
        await this.page.locator(selector.engagmentAnalyticsTab).click();
        await this.page.waitForSelector(selector.dateFilterTenure, { state: 'visible' });
        await this.page.locator(selector.dateFilterTenure).click();
        await this.page.locator(selector.startDate).fill(startdateValue);
        await this.page.locator(selector.endDate).fill(enddateValue);
        await this.page.locator(selector.applyDateFilter).click();
        await this.page.waitForSelector(selector.npsTenure, { state: 'visible' });
        await this.validateDetailsHighlightsData(npsHighlightsValue,engagmentScoreaHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue);     
     }



     async validateDetailsHighlightsData(npsHighlightsValue,engagmentScoreaHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue){
        var npsTenureValue = await this.page.locator(selector.npsTenure).textContent();
        expect(npsHighlightsValue).toBe(npsTenureValue);
        var engagmentScoreTenureValue= await this.page.locator(selector.engagmentScoresTenure).textContent();
        expect(engagmentScoreTenureValue).toBe(engagmentScoreaHighlightsValue);
        var moodScoreTenureValue= await this.page.locator(selector.moodScoreTenure).textContent();
        expect(moodScoreTenureValue).toBe(moodScoreHighlightsValue);
        var responseRateTenureValue= await this.page.locator(selector.responseRateTenure).textContent();
        expect(responseRateTenureValue).toBe(responseRateHighlightsValue);
        var totalPTMTenureValue= await this.page.locator(selector.totalPTMTenure).textContent();
        expect(totalPTMTenureValue).toContain(totalPTMHighlightsValue);
        let ESTextValueTenure = await this.page.locator(selector.ESText).textContent();
        expect(ESTextValue).toBe(ESTextValueTenure);
        let NPSTextValueTenure = await this.page.locator(selector.ESText).textContent();
        expect(NPSTextValue).toBe(NPSTextValueTenure);
        let MSTextValueTenure = await this.page.locator(selector.ESText).textContent();
        expect(MSTextValue).toBe(MSTextValueTenure);
        let RRTextValueTenure = await this.page.locator(selector.ESText).textContent();
        expect(RRTextValue).toBe(RRTextValueTenure);
        
     }

     async validateTenureBuckets(){
        try{
            await this.goToTenureHighlights();
            await this.page.locator(selector.lestThan1Year).click();
            await this.compareTenureBucketData();

            await this.page.locator(selector.oneToThreeYear).click();
            await this.compareTenureBucketData();

            await this.page.locator(selector.threeToFiveYear).click();
            await this.compareTenureBucketData();
            
            await this.page.locator(selector.fiveToTenYear).click();
            await this.compareTenureBucketData();

            await this.page.locator(selector.MoreThanTenYear).click();
            await this.compareTenureBucketData();

        }catch(err){
            console.log(err);
        }
        
     }

     async compareTenureBucketData(){
        const data = await this.getDataFromTenureHighlights();
        const {engagmentScoreaHighlightsValue,npsHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue} = data;
        await this.page.locator(selector.seeMoreES).click();
        await this.page.waitForSelector(selector.dateFilterTenure, { state: 'visible' });
        await this.validateDetailsHighlightsData(npsHighlightsValue,engagmentScoreaHighlightsValue,moodScoreHighlightsValue,responseRateHighlightsValue,totalPTMHighlightsValue,ESTextValue,NPSTextValue,MSTextValue,RRTextValue);
        await this.page.locator(selector.backArrow).click();
        await this.page.waitForSelector(selector.oneToThreeYear, { state: 'visible' });

     }
     
}

    module.exports = NavigateToYesterdayHighlights;