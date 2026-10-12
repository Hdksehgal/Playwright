class LoginPage{
    costructor(page){
        this.page = page
        const email = page.locator('#Email')
        const password = page.locator('#Password')
        const loginButton = page.locator('.login-button')

    }
    async enterEmail(emailId){
        await email.fill(emailId)
    }
    async enterPassword(pass){
        await password.fill(pass)
    }
    async clickLogin(){
        await loginButton.click()
    }
    
}
module.exports = {LoginPage}