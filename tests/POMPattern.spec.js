const {test,expect} = require('@playwright/test')
const {LoginPage} = require("../pages/LoginPage")
const {HomePage} = require("../pages/HomePage")
test('Following POM model',async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    const homepage = new HomePage(page)
    await homepage.loginlinkClick()
})

/*
When we're defining the POM pages
In constructor we'll pass the page and inside the constructor we'll define all the locators
and then in that class we'll define th 
*/