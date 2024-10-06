module.exports = {
    "applyButtonByText" : "//span[text() = 'Apply']",
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
        "touchpointRow" : "//tbody//tr[1]//td[contains(@id, 'table-row-touchpoint')]",
        "NOTES": {
            "addNoteButton": "//div[@class = 'ds-crisp-chat-footer-left-btns']//button[1]", // index 1 is when action is disabled
            "sendNoteButton": "//div[@class = 'footer-button']//span[text()= 'Send']",
            "notesFilterDropdown": "//div[@class = 'view-notes']//div[contains(@class , 'notes-view-filter-dropdown')]",
            "notesEditorBox": "//div[@class='public-DraftStyleDefault-block public-DraftStyleDefault-ltr']",
            "note_metaData_Date": "//div[@class = 'notes-card-container']//div[@class = 'notes-card'][1]//div[@class = 'note-meta-data']//p[1]",
            "note_metaData_noteType": "//div[@class = 'notes-card-container']//div[@class = 'notes-card'][1]//div[@class = 'note-meta-data']//p[2]/span",
            "latestNoteDescription": "//div[@class = 'notes-card-container']//div[@class = 'notes-card'][1]//p[1]/span",
            "notesCrossButton": "//div[contains(@class, 'ds-modal  notes-modal ')]//button[contains(@class, 'ds-modal-close-btn')]",
            "noteAbout_dropdown": "//section[@class = 'notes-wrapper-create-flow']//div[@class = 'ds-dropdown']//div[@class = 'ds-dropdown-trigger-start-items']",
            "userLevelNote_radioButton": "//div[contains(@class , 'notes-create-filter')]//span[text() = 'User-level']",

        },
        "SEE_HISTORY": {
            "seeHistoryButton": "//div[@class = 'ds-crisp-chat-footer-left-btns']//button[4]",   // index 4 is when action is disabled
            "date_label" : "//div[@class = 'user-history-container']//div[@class = 'history-section'][1]/p",
            "touchpoint_text": "//div[@class = 'user-history-container']//div[1]//div[@class = 'history-statement-wrapper']/p//span[2]",
            "noteContent": "//div[@class = 'user-history-container']//div[1]//div[@class = 'history-statement-wrapper']//div[@class = 'history-content-box']/p/p",
            "user_level_touchpoint_text": "//div[@class = 'user-history-container']//div[2]//div[@class = 'history-statement-wrapper']/p"

        }
    }
}