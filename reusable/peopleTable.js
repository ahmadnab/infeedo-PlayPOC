const selector = require('./commonSelectors');
const constants = require('./constants');

async function searchUser(page){
    await page.type(selector.peopleList.searchInputBox,  constants.PEOPLE_LIST_USER, { delay: 100 });
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForSelector(selector.peopleList.expandableTableRow);
    await page.locator(selector.peopleList.expandableTableRow).click();
}

/**
 * 
 * @param {*} action_type 
 * @param {*} content 
 * @param {*} page 
 * @returns 
 */

async function chatActionBasedOnType(action_type, page, content) {
    switch (action_type) {
        case 'touchpoint_note':
            const touchpointModuleData = await addTouchpointNote(content, page);
            return touchpointModuleData;

        case 'user_note': 
            const userModuleData = await addUserLevelNote(content, page);
            return userModuleData;
            
        case 'addToPTM':
            const status = await addPTM(content, page);
            return status;

        case 'removePtm': 
            await removePtm(content, page);
            break;
    
        default:
            throw new Error('Please send a valid action type')
    }
}

async function addTouchpointNote(content, page) {
    await page.locator(selector.peopleList.NOTES.addNoteButton).click();
    await page.waitForSelector(selector.peopleList.NOTES.notesFilterDropdown);
    await page.locator(selector.peopleList.NOTES.notesEditorBox).click();
    await page.keyboard.type(content, { delay: 100 });
    await page.locator(selector.peopleList.NOTES.sendNoteButton).click();
    await page.waitForTimeout(1000);
    const latestNote = String(await page.locator(selector.peopleList.NOTES.latestNoteDescription).textContent()).trim();
    const note_touchpoint =  String(await page.locator(selector.peopleList.NOTES.note_metaData_noteType).textContent()).trim();
    const note_date =  String(await page.locator(selector.peopleList.NOTES.note_metaData_Date).textContent()).trim();
    const moduleData = {content: latestNote, touchpoint: note_touchpoint, date: note_date};
    await page.locator(selector.peopleList.NOTES.notesCrossButton).click();
    return moduleData;    
}

async function getHistoryData(page, action_type, note_type = 'touchpoint') {
    await page.locator(selector.peopleList.SEE_HISTORY.seeHistoryButton).click();
    if(action_type === 'notes'){
        const historyDate = String(await page.locator(selector.peopleList.SEE_HISTORY.date_label).textContent()).trim();
        let historyTouchpoint = (note_type === 'touchpoint') ? String(await page.locator(selector.peopleList.SEE_HISTORY.touchpoint_text).textContent()).trim() : 
            String(await page.locator(selector.peopleList.SEE_HISTORY.user_level_touchpoint_text).textContent()).trim();
        if(note_type!= 'touchpoint'){
            const startIndex = historyTouchpoint.indexOf('added');
            historyTouchpoint = historyTouchpoint.substring(startIndex);
        }
        const historyNoteContent = String(await page.locator(selector.peopleList.SEE_HISTORY.noteContent).textContent()).trim();
        
        await page.locator(selector.peopleList.SEE_HISTORY.crossModalButton).click(); 
        return {
            date: historyDate, touchpoint: historyTouchpoint,
                note: historyNoteContent
        }
    }

    if(action_type === 'addPtm'){
        const historyDate = String(await page.locator(selector.peopleList.SEE_HISTORY.date_label).textContent()).trim();
        const historyTouchpoint = String(await page.locator(selector.peopleList.SEE_HISTORY.touchpoint_text).textContent()).trim();
        const caseRisk = String(await page.locator(selector.peopleList.SEE_HISTORY.caseRiskText).textContent()).trim();
        const reason = String(await page.locator(selector.peopleList.SEE_HISTORY.ptmAddReason).textContent()).trim();
        return {
            date: historyDate, touchpoint: historyTouchpoint, risk: caseRisk, reason: reason
        }
    }

    if(action_type === 'removePtm'){
        const historyTouchpoint = String(await page.locator(selector.peopleList.SEE_HISTORY.touchpoint_text).textContent()).trim();
        const reason = String(await page.locator(selector.peopleList.SEE_HISTORY.ptmRemoveReason).textContent()).trim();
        const historyDate = String(await page.locator(selector.peopleList.SEE_HISTORY.date_label).textContent()).trim();
        return {
            date: historyDate, touchpoint: historyTouchpoint, reason: reason
        }
    }
    
}

async function addPTM(content, page) { 
    await page.locator(selector.peopleList.PTM.addToPtm_Button).click();
    await page.waitForSelector(selector.peopleList.PTM.otherReasonCheckbox);
    await page.locator(selector.peopleList.PTM.ptmNoteEditor).click();
    await page.keyboard.type(content, { delay: 100 });
    await page.locator(selector.peopleList.PTM.addButton).click();
    await page.waitForSelector(selector.peopleList.PTM.caseStatusButton);
    const status = await page.locator(selector.peopleList.PTM.caseStatusButton).textContent();
    await page.locator(selector.peopleList.PTM.crossModalButton).click();
    return status;
}

async function removePtm(content, page) {
    await page.locator(selector.peopleList.PTM.caseStatusButton).click();
    await page.locator(selector.peopleList.PTM.removePtmDropdownOption).click();
    await page.locator(selector.peopleList.PTM.ptmNoteEditor).click();
    await page.keyboard.type(content, { delay: 100 });
    await page.locator(selector.peopleList.PTM.removeButton);
}

async function addUserLevelNote(content, page) {
        await page.locator(selector.peopleList.NOTES.addNoteButton).click();
        await page.waitForSelector(selector.peopleList.NOTES.notesFilterDropdown);
        await page.locator(selector.peopleList.NOTES.noteAbout_dropdown).click({ force: true });
        await page.locator(selector.peopleList.NOTES.userLevelNote_radioButton).click();
        await page.locator(selector.applyButtonByText).click({ force: true });
    
        await page.locator(selector.peopleList.NOTES.notesEditorBox).click();
        await page.keyboard.type(content, { delay: 100 });
        await page.locator(selector.peopleList.NOTES.sendNoteButton).click();
        await page.waitForTimeout(1000);
    
        const latestNote =  String(await page.locator(selector.peopleList.NOTES.latestNoteDescription).textContent()).trim();
        const note_touchpoint =  String(await page.locator(selector.peopleList.NOTES.note_metaData_noteType).textContent()).trim();
        const note_date =  String(await page.locator(selector.peopleList.NOTES.note_metaData_Date).textContent()).trim();
        const moduleData = {content: latestNote, touchpoint: note_touchpoint, date: note_date};
        await page.locator(selector.peopleList.NOTES.notesCrossButton).click();
        return moduleData; 
}


module.exports = {
    searchUser,
    chatActionBasedOnType,
    getHistoryData
}