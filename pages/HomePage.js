// const {test,require} = require("@playwright/test")
class HomePage{
    constructor(page){
        this.page=page
        this.loginlink = page.locator('.ico-login')
    }
    async loginlinkClick(){
        await this.loginlink.click()
    }
}
module.exports = {HomePage}

// exports.HomePage = 