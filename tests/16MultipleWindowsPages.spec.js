import {test,expect, chromium} from "@playwright/test"

test("Handle Pages/Windows",async()=>{
    const browser = await chromium.launch()
    const context = await browser.newContext()
    
    const page1 = await context.newPage()
    const page2 = await context.newPage()

    const allPages = context.pages()
    console.log("No of Pages: ",allPages)

    await page1.goto("https://orangehrm.com/")
    expect(page1).toHaveTitle("OrangeHRM: All in One HR Software for Businesses | OrangeHRM")

    await page2.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    expect(page2).toHaveTitle("OrangeHRM")

})

test("Handle Multiple Pages",async()=>{
    const browser = await chromium.launch()
    const context = await browser.newContext()
    
    const page1 = await context.newPage()

    await page1.goto("https://opensource-demo.orangehrmlive.com/")
    expect(page1).toHaveTitle("OrangeHRM")

    const pagePromise = context.waitForEvent('page')
    await page1.getByRole("link",{name: "OrangeHRM, Inc"}).click()
    
    const newPage = await pagePromise
    await expect(newPage).toHaveTitle("OrangeHRM: All in One HR Software for Businesses | OrangeHRM")

})