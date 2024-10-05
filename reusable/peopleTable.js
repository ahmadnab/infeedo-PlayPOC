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
            const latestNote = await addTouchpointNote(content, page);
            return latestNote;

        case 'userLever_note': 
            await addUserLevelNote(content, page);
        break;
        case 'AddToPTM':
            await addPTM();
            break;
    
        default:
            throw new Error('Please send a valid action type')
    }
}

async function addTouchpointNote(content, page) {
    console.log('inside note');
    await page.locator(selector.peopleList.addNoteButton).click();
    await page.waitForSelector(selector.peopleList.notesFilterDropdown);
    await page.locator(selector.peopleList.notesEditorBox).click();
    await page.keyboard.type(content, { delay: 100 });
    await page.locator(selector.peopleList.sendNoteButton).click();
    await page.waitForTimeout(1000);
    const latestNote = await page.locator(selector.peopleList.latestNoteDescription).textContent();
    return latestNote;    
}

async function addPTM() {
    
}

async function addUserLevelNote(content, page) {
    
}


module.exports = {
    searchUser,
    chatActionBasedOnType
}