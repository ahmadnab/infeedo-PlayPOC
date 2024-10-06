const selector = require('./commonSelectors');
const constants = require('./constants');

async function searchUser(page){
    await page.type(selector.peopleList.searchInputBox,  constants.PEOPLE_LIST_USER, { delay: 100 });
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForSelector(selector.peopleList.expandableTableRow);
    await page.locator(selector.peopleList.expandableTableRow).click();
}

async function chatActionBasedOnType(action_type, content, page) {
    switch (action_type) {
        case 'touchpoint_note':
            const touchpointModuleData = await addTouchpointNote(content, page);
            return touchpointModuleData;

        case 'user_note': 
            const userModuleData = await addUserLevelNote(content, page);
            return userModuleData;
            
        case 'AddToPTM':
            await addPTM();
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
    if(action_type === 'notes'){
        await page.locator(selector.peopleList.SEE_HISTORY.seeHistoryButton).click();
        const historyDate = String(await page.locator(selector.peopleList.SEE_HISTORY.date_label).textContent()).trim();
        let historyTouchpoint = (note_type === 'touchpoint') ? String(await page.locator(selector.peopleList.SEE_HISTORY.touchpoint_text).textContent()).trim() : 
            String(await page.locator(selector.peopleList.SEE_HISTORY.user_level_touchpoint_text).textContent()).trim();
        if(note_type!= 'touchpoint'){
            const startIndex = historyTouchpoint.indexOf('added');
            historyTouchpoint = historyTouchpoint.substring(startIndex);
        }
        const historyNoteContent = String(await page.locator(selector.peopleList.SEE_HISTORY.noteContent).textContent()).trim();
        
        return {
            date: historyDate, touchpoint: historyTouchpoint,
                note: historyNoteContent
        }
    }
    
}

async function addPTM() {
    
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