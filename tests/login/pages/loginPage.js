const {expect} = require('@playwright/test');
const config = require('../../../test-data/config.json');
const selector = require('../components/loginComponents.js');

class LoginPage{
    constructor(page){
        this.page = page;
    }
    async login(module){
        try{
            await this.page.goto(`${config.baseURL}/login`)
            switch(module) {
                case 'dashboard':
                    await this.commonLogin();
                    await expect(this.page).toHaveURL(config.YesterdayHighlightsURL);
                    break;
                case 'chat':
                    await this.page.locator(selector.loginSwitchDropdown).click();
                    await this.page.locator(selector.chatOptionLoginDropdown).click();
                    await this.commonLogin(); 
                    break;
                default:
                    throw new Error('invalid module name');
            }
        }
        catch(err){
            console.error(err);
            throw err;
        }
    }

    async commonLogin(){
            await this.page.locator(selector.usernameInputField).fill(config.username);
            await this.page.locator(selector.passwordInputField).fill(config.password);
            await this.page.locator(selector.loginButton).click();
    }
    async navigateToAB(){
      await page.waitForSelector(selector.backButton);
      await page.screenshot({ path: 'screenshotChat.png' });
      await page.locator(selector.backButton).click();
      await page.locator(selector.menuChatbot).click();
      await page.locator(selector.anoynymousBatButton).click();
    }

    async navigateToAIA(){
      await page.locator(selector.backButton).click();
      await page.locator(selector.aiAssistButton).click();
    }

    async isErrorToastVisible() {
        try {
          await this.page.waitForSelector(selector.errorToast, { timeout: 5000, state: 'visible' });
          return true;
        } catch (e) {
          return false;
        }
      }

      async takeScreenshot(fileName) {
        await this.page.screenshot({ path: `./screenshots/${fileName}.png` });
      }

      async enterEmail(email) {
        await this.page.fill(selector.usernameInputField, email);
      }
    
      async enterPassword(password) {
        await this.page.fill(selector.passwordInputField, password);
      }
    
      async clickLogin() {
        await this.page.click(selector.loginButton);
      }
}

module.exports = LoginPage;