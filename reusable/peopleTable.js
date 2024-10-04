const selector = require('./commonSelectors');
const constants = require('./constants');

async function searchUser(page){
    await page.locator(selector.peopleList.searchInputBox).fill(constants.PEOPLE_LIST_USER);
    await page.locator(selector.peopleList.expandableTableRow).toBeVisible();
}


module.exports = {
    searchUser
}