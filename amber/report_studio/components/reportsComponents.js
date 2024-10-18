const moduleMappingSideNav = require('../../../test-data/sidemenuMap.js');

module.exports = {
    reportStudioModuleSelector : `//aside[@id="main-side-nav-aside"]//a[${moduleMappingSideNav.report_studio}]`,
    sideMenu : "//div[@class = 'side-menu-scrollable-section']",
    globalTemplates: {
        viewTemplatesButton: "//div[@class = 'config-global-templates-view-all']",
        searchTemplate: "//div[@class='config-global-templates-modal-left-header']//input[@id='ds-input-field']",
        useTemplateButton: "//div[contains(@class, 'config-global-templates-ds-modal')]//div[@class = 'ds-templates-card-body']//button",
        generateReportButton: "//div[contains(@class , 'template-modal')]//button[contains(@class, 'ds-button--primary')]",
        pulseTab: "//div[@class = 'ds-segmented-tablist']//div[contains(@class, 'ds-segmented-tab-wrapper')][2]",
        exitTab: "//div[@class = 'ds-segmented-tablist']//div[contains(@class, 'ds-segmented-tab-wrapper')][3]"
    }

}