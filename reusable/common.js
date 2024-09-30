const Tenure = require('../amber/tenure/pages/tenureLanding');
const commonSelectors = require('./commonSelectors');

async function getPTMCounts(page, module_name, params = null){
    if(module_name === 'tenure'){
        const tenure = new Tenure(page);
        await tenure.switchToTenureModule();
    }
        const openCaseElement = commonSelectors.ptmStrip.openCases;
        const inProgressCaseElement = commonSelectors.ptmStrip.inProgressCases;
        const closedCaseElement = commonSelectors.ptmStrip.closedCases;
        const expiredCaseElement = commonSelectors.ptmStrip.expiredCases;

        const totalCasesData = await page.locator(commonSelectors.ptmStrip.totalCases).textContent(); 
        const openCasesData =  (await page.locator(openCaseElement).isVisible()) ? await page.locator(openCaseElement).textContent() : 0;
        const inProgressCasesData =  (await page.locator(inProgressCaseElement).isVisible()) ? await page.locator(inProgressCaseElement).textContent() : 0; 
        const closedCasesData =  (await page.locator(closedCaseElement).isVisible()) ? await page.locator(closedCaseElement).textContent() : 0;
        const expiredCasesData =  (await page.locator(expiredCaseElement).isVisible()) ? await page.locator(expiredCaseElement).textContent() : 0;

        const totalCases = extractAllNumbers(totalCasesData);
        const openCases = extractAllNumbers(openCasesData);
        const inProgressCases = extractAllNumbers(inProgressCasesData);
        const closedCases = extractAllNumbers(closedCasesData);
        const expiredCases = extractAllNumbers(expiredCasesData);
        
        return {
            totalCases, openCases, inProgressCases, 
            closedCases, expiredCases
        }
}

function compareData(moduleData, expectedData){
    const keys = Object.keys(expectedData);
    for(const key of keys){
        if(moduleData[key]!== expectedData[key]){
            console.error(`Mismatch found at key: ${key}. 
                Value in Module: ${moduleData[key]} vs Value in expected: ${expectedData[key]} `);
            return false;
        }
    }
    return true;        // return true if all values are similar
}

function extractAllNumbers(inputString) {
    // Use regular expression to match all numeric values
    const str = String(inputString);
    const numbers = str.match(/\d+/g);
    return numbers ? Number(numbers) : 0;
  }
  


module.exports = {
    getPTMCounts,
    compareData
}