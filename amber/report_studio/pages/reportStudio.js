const selector = require('../components/reportsComponents');
const config = require('../../../test-data/config.json');
const common = require('../../../reusable/common');
const axios = require('axios');

class ReportStudio{
    constructor(page, module){
        this.page = page;
        this.module = module
    }

    async switchToReportStudio(){
        await this.page.waitForSelector(selector.sideMenu);
        await this.page.hover(selector.sideMenu); 
        await this.page.locator(selector.reportStudioModuleSelector).click();
        const url = config.url.reportStudioURL;
        await expect(this.page).toHaveURL(url);
    }

    async createReportFromTemplates(template_name){
        const survey_type = this.module;
        await this.page.locator(selector.globalTemplates.viewTemplatesButton).click();
        if(survey_type === 'pulse'){
            
        }
        if(survey_type === 'exit'){
            
        }
        await this.page.locator(selector.globalTemplates.searchTemplate).fill(template_name);
        await this.page.locator(selector.globalTemplates.useTemplateButton).click();
        await common.waitForEnabled(this.page, selector.globalTemplates.generateReportButton);
        await this.page.locator(selector.globalTemplates.generateReportButton).click({force: true});
        const url = await this.getSlideURL();
        return url;
    }

    async getSlideURL(){
        try{
            const token = await common.getToken();
            const headers = {
                'authorization': `Bearer ${token}`,
                'user_role_id': 41397,
                'Content-Type': 'application/json',
              };
            const url = `https://api-re.fidento.com/v1/config_report/reports`   // change when running on production
            const response = await axios.get(url,
                { headers: headers});

            console.log('Response data:', response.data);

            if (response.data && response.data.data.reports.length > 0) {
                const firstReport = response.data.data.reports[0];
    
                if (firstReport.status === 'success') {
                    console.log('First report has status "success"');
                    return firstReport.urls;
                } else {
                    console.log('First report status is not "success", retrying in 10 seconds...');
                    setTimeout(getSlideURL, 10000);
                }
            } else {
                console.error('No reports found in response');
            }
        }
        catch(err){
            console.error('Error fetching slide URL:', err);
        }
    };

}


module.exports = ReportStudio;
