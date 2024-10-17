const moduleMappingSideNav = require('../../../test-data/sidemenuMap.js');

module.exports = {
    peopleListTab: "//div[@class = 'module-bar-content']//div[@class = 'ds-segmented-tablist']//div[2]",
    exportIcon: "//span[@aria-label = 'Export']",
    exportFilteredEmployeesOption: 
        "//div[@class = 'ds-modal-export-employee-select']//div[contains( @class,'ds-modal-export-employee-select-option-step-1')][1]//label",
    nextButton: "//span[@class = 'ds-global-modal-footer-cta']//span[text()= 'Next']",
    exportButton: "//span[@class = 'ds-global-modal-footer-cta']//span[text()= 'Export']",
    tenureModuleSelector : `//aside[@id="main-side-nav-aside"]//a[${moduleMappingSideNav.tenure}]`,
    sideMenu : "//div[@class = 'side-menu-scrollable-section']",
    toastMessage : "//p[contains(@class,'ds-typography text-style-body-3')]",
    card_metrics: {
        rr_card_metrics: `//section[contains(@class, 'landing-page-score-card-container')]//div[@class = 'ds-score-card-wrapper'][4]//button`,
    },
    responseRate_innerPage: {
        rrArcNumber: "//section[@class = 'arc-card-container']//p[@class = 'ds-typography text-style-body-data-large']",
        rrArcDelta: "//div[@class = 'ds-arc-delta-cont']//span[@class = 'ds-card-delta-container']/p",
        completed: "//article[@class = 'distribution-container']//section[@class = 'distribution-content']//div[@class = 'distribution-content--list'][1]//div[3]/p[1]",
        dropped: "//article[@class = 'distribution-container']//section[@class = 'distribution-content']//div[@class = 'distribution-content--list'][2]//div[3]/p[1]",
        toStart: "//article[@class = 'distribution-container']//section[@class = 'distribution-content']//div[@class = 'distribution-content--list'][3]//div[3]/p[1]",

    }

}