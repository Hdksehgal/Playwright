import {test, expect} from "@playwright/test"

test('AssertionsTest',async({page})=>{
    /*
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    //1) expect(page).toHaveUrl : Page has URL
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    //2) expect(page).toHaveTitle: Page has title
    await expect(page).toHaveTitle("OrangeHRM")

    //3) expect(locator).toBeVisible: Element is visible 
    await expect(page.getByAltText("company-branding")).toBeVisible

    //4) expect(locator).toBeEnabled
    await expect(page.getByPlaceholder("Username")).toBeEnabled()


    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole("link",{name:"Admin"}).click()

    // const checkbox = await page.getByRole('cell').first()
    // await checkbox.click()

    */

    //5)expect(locator).toBeChecked()
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html#")
    const checkbox1 = await page.locator("//input[@type='checkbox']").first()
    await checkbox1.click()
    await expect(checkbox1).toBeChecked()

    //6) expect(locator).toHaveAttribute()
    await expect(page.getByRole("button",{name:"Start"})).toHaveAttribute('onclick','toggleButton(this)')

    //7) expect(locator).toHaveText : This is case sensitive so the case should also be exact (it checks that the locator contains the exact text)
    await expect(page.locator("//div[@class='titlewrapper']")).toHaveText("Automation Testing Practice")

    //8) expect(locator).toContainsText : This is case sensitive so the case should also be exact (it checks that the locator contains the partial text)
    await expect(page.locator("//div[@class='descriptionwrapper']")).toContainText("Playwright")

    //9) expect(locator).toHaveValue : check whether the inpuit box has value
    const inputUser = await page.locator("#username")
    await inputUser.fill("OhohohoOhohoho")
    await expect(inputUser).toHaveValue("OhohohoOhohoho")

    //10) expect(locator).toHaveCount() : this is helpful when we're we want validate option count for a dropdown
    await page.locator("#comboBox").click()
    await expect(page.locator("#dropdown > .option")).toHaveCount(100)

    //11 Negative assertions : we can use the keyword 'not' just before the assertions
    await expect(page.locator("#dropdown > .option")).not.toHaveCount(98)
    
})

/*
Hard Assertion: if a hard assertion fails then further code or further assertions are not executed
Soft Assertion: Even if a soft assertion fails the code or the assertions coming afterwards are still executed
*/

test("Soft Assertions Hard Assertions",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html#")
    
    //Hard Assertions
    await expect(page).toHaveTitle("Automation Testing Practice: PlaywrightPractic")
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/p/playwrightpractice.html#")
    await expect(page.getByAltText("logo image")).toBeVisible()

    //Soft Assertions
    // await expect.soft(page).toHaveTitle("Automation Testing Practice: PlaywrightPractic")
    // await expect.soft(page).toHaveURL("https://testautomationpractice.blogspot.com/p/playwrightpractice.htm#")
    // await expect.soft(page.getByAltText("logo image")).toBeVisible()

})