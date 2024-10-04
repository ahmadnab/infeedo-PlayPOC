const selector = require('./commonSelectors');
const constants = require('./constants');

async function searchUser(page){
    await page.locator(selector.peopleList.searchInputBox).fill(constants.PEOPLE_LIST_USER);
    await page.locator(selector.peopleList.expandableTableRow).toBeVisible();
}

async function chatActionBasedOnType(action_type) {
    switch (action_type) {
        case 'notes':
            await addNote();
            break;
        case 'AddToPTM':
            await addPTM();
            break;
    
        default:
            throw new Error('Please send a valid action type')
    }
}

async function addNote() {
    
}

async function addPTM() {
    
}


module.exports = {
    searchUser,
    chatActionBasedOnType
}