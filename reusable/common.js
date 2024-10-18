const Tenure = require('../amber/tenure/pages/tenure');
const commonSelectors = require('./commonSelectors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');


/**
 * 
 * @param {*} page 
 * @param {*} module_name - to handle all modules, tenure, pulse, mtm
 * @param {*} params - to handle pulse name and moment type navigation
 * @returns object having count of ptm count per status
 */

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
        if (moduleData[key]!== expectedData[key]) {
            console.error(`Mismatch found at key: ${key}. 
                Value in Module: ${moduleData[key]} vs Value in expected: ${expectedData[key]} `);
            return false;
        }
    }
    return true;
}
/**
 * 
 * @param {*} inputString - string to extract digits
 * @returns digits from string
 */

function extractAllNumbers(inputString) {
    const str = String(inputString);
    const numbers = str.match(/[\d,]+(\.\d+)?/g);
    return numbers ? numbers.map(num => Number(num.replace(/,/g, ''))) : 0;
}


/**
 * 
 * @param {*} page - browser page context
 * @param {*} container_name - The name of the div container that holds the trend graph.
 * @returns target path of downloaded file
 */

async function exportTrendGraph(page, container_name){
    if (!container_name) throw new Error('Please send a valid container name to get xPath for graph export');

    const exportSelector = `//div[@id='${container_name}']//span[@aria-label='Export']`;
    await page.locator(exportSelector).click();
    const [download] = await Promise.all([
        page.waitForEvent('download'), // Wait for download to trigger
        await page.locator(commonSelectors.csvFileExport).click()
    ]);

    const fileName = download.suggestedFilename();
    const targetPath = path.join(__dirname, fileName);

    await download.saveAs(targetPath);
    console.log(`File downloaded to: ${targetPath}`);
    return targetPath;
}

function cleanUpDownload(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
    }
}

async function getToken(){
    const authenticate_url = `https://api.dev2.amber.infeedo.com/v1/authenticate`;
    const authenticatePayload = {
        email: '166958@inf-285.com',
        password: [35, 28, 15, 83, 84, 95, 48, 18, 15, 67, 80, 84],     // change based on user and encoded password
        route: 'dashboard'
      };
      try {
        const response = await axios.post(authenticate_url, authenticatePayload);
    
        if (response.status === 200) {
            const token = response.data.token;
            console.log('Token:', token);
          return token;
        } else {
          console.error('Failed to get token:', response.status);
          return null;
        }
      } catch (error) {
        console.error('Error during token retrieval:', error);
        return null;
      }
}

async function waitForEnabled(page, xpath) {
    await page.waitForSelector(`xpath=${xpath}`, { state: 'visible' });
  
    await page.waitForFunction(
      (xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return element && !element.disabled;
      },
      xpath 
    );
  }
 

module.exports = {
    getPTMCounts,
    compareData,
    exportTrendGraph,
    cleanUpDownload,
    getToken,
    waitForEnabled,
    extractAllNumbers
}