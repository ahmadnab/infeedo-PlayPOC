module.exports = {
    "ptmStrip" :{
        "totalCases": "//div[@class = 'ptmcase-left']//p[@class = 'ds-typography text-style-body-3']",
        "openCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge red']//p",
        "inProgressCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge yellow']//p",
        "closedCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge green']//p",
        "expiredCases": "//div[@class = 'ptmcase-badges']//label[@class = 'ds-badge grey']//p",
    },
    "csvFileExport": "//span[text() = 'CSV file']",
    "peopleList" : {
        "searchInputBox": "//input[@type = 'text' and @id = 'expandable-search']",
        "expandableTableRow": "//tbody//tr[1]",
        "addNoteButton": "//div[@class = 'ds-crisp-chat-footer-left-btns']//button[1]", // index 1 is when action is disabled
        "sendNoteButton": "//div[@class = 'footer-button']//span[text()= 'Send']",
        "notesFilterDropdown": "//div[@class = 'view-notes']//div[@class = 'ds-dropdown']",
        "notesEditorBox": "//div[@class='public-DraftStyleDefault-block public-DraftStyleDefault-ltr']",
        "latestNoteDescription": "//div[@class = 'notes-card-container']//div[@class = 'notes-card'][1]//p[1]/span",
        "touchpointRow" : "//tbody//tr[1]//td[contains(@id, 'table-row-touchpoint')]",
        "note_metaData_Date": "//div[@class = 'notes-card-container']//div[@class = 'notes-card'][1]//div[@class = 'note-meta-data']//p[1]",
        "note_metaData_noteType": "//div[@class = 'notes-card-container']//div[@class = 'notes-card'][1]//div[@class = 'note-meta-data']//p[2]/span"
    }
}