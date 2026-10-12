import {test,expect} from "@playwright/test"
/*
Whenever we are using hooks make sure that 
you set fullyParallel: false in playwright.config.js
//Run tests in files in parallel
fullyParallel: false,

also you need to cross-check whether workers is equal to 1 like below
//Opt out of parallel tests on CI.
workers: process.env.CI ? 1 : undefined,


*/

//we're going to use this global instance of page in every testcase so that test execution will be on same page

let page;

test.beforeEach(async({browser})=>{
    //Login
    page = await browser.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.getByRole("button",{name:"Login"}).click()
})

test.afterEach(async()=>{
    //Logout
    await page.locator("//li[@class='oxd-userdropdown']").click()
    await page.locator("//ul[@class='oxd-dropdown-menu']//a[text()='Logout']").click()
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

})

test("Verify My Info",async({},testInfo)=>{
    //Task
    await page.getByText("My Info").click()
    const name = await page.getByPlaceholder("First Name").allInnerTexts()
    const heading = await page.locator("//h6[@class = 'oxd-text oxd-text--h6 --strong']")
    // const heading = await page.locator("//h6[text()='manda user']") //incorrect
    await expect(heading).toContainText(name);
    //How to attach screenshot
    const screenshot = await page.screenshot();
    await testInfo.attach("After matching the first name with profile name",{body: screenshot, contentType:'image/png'})
})

test("About Verification test",async()=>{
    //Task
    await page.locator("//span[@class = 'oxd-userdropdown-tab']").click()
    // page.on("dialog", async dialog=>{
    //     console.log(dialog.type())
    //     console.log(dialog.message())
    //     await dialog.dismiss()
    // }) //no need of this 
    await page.getByRole("menuitem",{name:"About"}).click()
    await expect(page.getByRole("gridcell",{name:"OrangeHRM"}).isVisible()).toBeTruthy()
    await page.getByRole('button', { name: '×' }).click()

})


/*
NORMAL CODE WITHOUT THE USE OF HOOKS

test("Verify My Info",async({page})=>{
    //Login
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.getByRole("button",{name:"Login"}).click()
    

    //Task
    await page.getByText("My Info").click()
    const name = await page.getByPlaceholder("First Name").allInnerTexts()
    const heading = await page.locator("//h6[@class = 'oxd-text oxd-text--h6 --strong']")
    // const heading = await page.locator("//h6[text()='manda user']") //incorrect
    await expect(heading).toContainText(name);

    //Logout
    await page.locator("//li[@class='oxd-userdropdown']").click()
    await page.locator("//ul[@class='oxd-dropdown-menu']//a[text()='Logout']").click()
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")



})

test("About Verification test",async({page})=>{
    //Login
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.getByRole("button",{name:"Login"}).click()

    //Task
    await page.locator("//span[@class = 'oxd-userdropdown-tab']").click()
    // page.on("dialog", async dialog=>{
    //     console.log(dialog.type())
    //     console.log(dialog.message())
    //     await dialog.dismiss()
    // })
    await page.getByRole("menuitem",{name:"About"}).click()
    await expect(page.getByRole("gridcell",{name:"OrangeHRM"}).isVisible()).toBeTruthy()
    await page.getByRole('button', { name: '×' }).click()


    //Logout
    await page.locator("//li[@class='oxd-userdropdown']").click()
    await page.locator("//ul[@class='oxd-dropdown-menu']//a[text()='Logout']").click()
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
})

*/


