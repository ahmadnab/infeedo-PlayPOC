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

}