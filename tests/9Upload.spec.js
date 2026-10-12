import {test, expect} from "@playwright/test"
test("Upload",async({page})=>{
    // "C:/Users/hardik/OneDrive - Capgemini/Desktop/Java Practice Material 1/notes.txt"i
    await page.goto("https://www.stepcampus.in/playground")
    //Keep in mind when you're pasting the relative path or normal path don't forget to replace '\' with '/' otherwise it'll not work
    
    //Uploading single file
    // await page.locator("#file-upload").setInputFiles("C:/Users/hardik/OneDrive - Capgemini/Desktop/Java Practice Material 1/Git.docx")
    //await page.locator("#file-upload").setInputFiles("tests/Files/notes.txt")//this is working as well

    await page.waitForTimeout(3000)

})

test("Multiple Upload",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")

    //Upload Input
    await page.locator("#multipleFilesInput").setInputFiles(['c:/Users/hardik/OneDrive - Capgemini/Desktop/Java Practice Material 1/notes.txt',
        'C:/Users/hardik/OneDrive - Capgemini/Desktop/Java Practice Material 1/Selenium_Q&A.pdf'])
    //Upload button
    const multipleUploadButton = await page.getByRole("button",{name:"Upload Multiple Files"})
    await multipleUploadButton.click()

    await expect.soft(page.locator("#multipleFilesStatus")).toContainText("notes.txt")
    await expect.soft(page.locator("#multipleFilesStatus")).toContainText("Selenium_Q&A.pdf")

    //Removing Files
    await page.locator("#multipleFilesInput").setInputFiles([])
    await multipleUploadButton.click()

    await expect.soft(page.locator("#multipleFilesStatus")).toHaveText("No files selected.")
    await page.waitForTimeout(2000)
})