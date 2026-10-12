const {test,expect} = require("@playwright/test")

test("Radio buttons",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    await page.locator("#male").click()
    await expect(page.locator("#male").isChecked()).toBeTruthy()
    await expect(page.locator("#female")).not.toBeChecked()

    //you handle the other buttons like checkbox buttons the same way
})