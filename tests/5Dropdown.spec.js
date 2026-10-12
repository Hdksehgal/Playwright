import {test,expect} from "@playwright/test"

test("Dropdowns",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    //Many ways to locate a dropdown option
    // await page.locator("#country").selectOption({label:"Japan"}) //label/visible text
    // await page.locator("#country").selectOption("Germany") //visible text
    // await page.locator("#country").selectOption({value:"france"}) //by using value
    // await page.locator("#country").selectOption({index: 3}) //by using index
    // await page.selectOption("#country","India") //by text


    //Assretions on dropdown
    //1st way
    const options = await page.locator("#country option")
    await expect(options).toHaveCount(10)

    //2nd way
    await page.locator("#comboBox").click()
    const options2 = await page.$$("#dropdown .option")
    console.log("dropdown option count: ",options2.length)
    await expect(options2.length).toBe(100)

    //check presence of value in dropdown
    const Content = await page.locator("#country").textContent()
    console.log(Content)
    await expect(Content.includes('India')).toBeTruthy()

    await page.waitForTimeout(2000)
})

test("Multi Select Dropdown",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.selectOption("#animals",['Cat','Deer', 'Fox', 'Lion'])
    await page.waitForTimeout(2000)
})

test("Bootstrap dropdown",async({page})=>{
    //Bootstarap dropdown is a dropdown which doesn't have Select tag
    await page.goto("https://www.w3schools.com/bootstrap/bootstrap_dropdowns.asp")
    //first we have to click on the dropdown
    await page.locator("#menu1").click()
    //get all the options
    const options = await page.locator("//ul[@aria-labelledby='menu1']/li//a[@role='menuitem']")
    await expect(options).toHaveCount(3)

})

test("Auto suggest / Auto complete dropdown",async({page})=>{
    await page.goto("https://demoqa.com/auto-complete")

    await page.locator("#autoCompleteSingleInput").fill("e")
    const firstOption = await page.getByRole('option').nth(0)
    // await page.pause()
    await firstOption.click()
    await expect(page.locator(".auto-complete__single-value css-1dimb5e-singleValue").isVisible()).toBeTruthy()
    // console.log(firstOption.textContent())

    //to locate elements in Auto suggest dropdown is really tough you can't do it manually by inspect and locate you have to take help from codegen or SelectorsHub
})

test("Hidden dropdown",async({page})=>{
    //Hidden dropdown : dropdown which doesn't have select tag as well as we can inspect their dropdown options
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.pause()
    await page.locator('div:nth-child(6) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
    await page.getByRole('option', { name: 'Account Assistant' }).click()
    
})

