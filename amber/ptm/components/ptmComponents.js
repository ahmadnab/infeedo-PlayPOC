const moduleMappingSideNav = require('../../../test-data/sidemenuMap.js');

module.exports = {
    ptmModuleSelector : `//aside[@id="main-side-nav-aside"]//a[${moduleMappingSideNav.ptm}]`,
    sideMenu : "//div[@class = 'side-menu-scrollable-section']",
    toastMessage : "//p[contains(@class,'ds-typography text-style-body-3')]",
    ptmAnalyticsTab: "//div[@class = 'module-bar-content']//div[@class = 'ds-segmented-tablist']/div[1]",
    ptmListTab: "//div[@class = 'module-bar-content']//div[@class = 'ds-segmented-tablist']/div[2]",
    totalCaseElement: "//section[contains(@class, 'ds-sc-has-border-right')]//div[@class = 'ds-sc-score']//p[@class = 'ds-typography text-style-body-data-large']",
    caseBreakdownElements: {
        openCaseElement: "//div[@class = 'ds-score-card ']//section[@class = 'distribution-content']//div[@class = 'distribution-content--list'][1]//div[@class = 'distribution-right-text']//p[1]",
        closedCaseElement: "//div[@class = 'ds-score-card ']//section[@class = 'distribution-content']//div[@class = 'distribution-content--list'][3]//div[@class = 'distribution-right-text']//p[1]",
        inProgressElement: "//div[@class = 'ds-score-card ']//section[@class = 'distribution-content']//div[@class = 'distribution-content--list'][2]//div[@class = 'distribution-right-text']//p[1]",
        expiredElement: "//div[@class = 'ds-score-card ']//section[@class = 'distribution-content']//div[@class = 'distribution-content--list'][4]//div[@class = 'distribution-right-text']//p[1]"
    },
    ptmSourceDropdown : "//div[@class = 'ds-dropdown-container ptm-source-dropdown']//button",
    ptmSourceTenureOption: "//div[@class = 'ds-dropdown-item-list']//div[@role = 'menuitemcheckbox'][2]//div[@class = 'option-input']",
    ptmSourceApplyButton: "//div[@class = 'ds-dropdown-footer']//span[text() = 'Apply']",
    trendTabCSA: "//div[@id = 'ptm-case-analysis-container']//div[text() = 'Trend']",
    trendCSA_timelineTabs : "//div[@id = 'ptm-case-analysis-container']//div[@class = 'ds-segmented-tablist']",
    cumulativeToggle : "//div[@id = 'ptm-case-analysis-container']//input[@type = 'checkbox']",
    agingOpenCase : "//div[@class= 'no-padding aging-score-card-container']//div[@class = 'ds-score-card-wrapper small ptm-aging-score-card'][1]//div[@class = 'ds-sc-score']//p",
    agingInProgressCase: "//div[@class= 'no-padding aging-score-card-container']//div[@class = 'ds-score-card-wrapper small ptm-aging-score-card'][2]//div[@class = 'ds-sc-score']//p"
}