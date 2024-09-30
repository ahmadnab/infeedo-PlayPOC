module.exports = {
    "ptmStrip" :{
        "totalCases": "//div[@class = 'ptmcase-left']//p[@class = 'ds-typography text-style-body-3']",
        "openCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge red']//p",
        "inProgressCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge yellow']//p",
        "closedCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge green']//p",
        "expiredCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge grey']//p",
    }
}