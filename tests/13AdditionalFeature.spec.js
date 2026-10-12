import {test,expect} from '@playwright/test'
/*
VIDEOS
we can record video by chaning the video : "on" in playwright.spec.js
This recorded video can be seen in the test report

TRACE VIEWER
we can trace our testcase and like inspect and debug the issue by using trace viewer by setting trace : 'on' in playwright 
*/

test("Multiple Upload",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")

    //Upload Input
    await page.locator("#multipleFilesInput").setInputFiles(['c:/Users/hardik/OneDrive - Capgemini/Desktop/Java Practice Material 1/notes.txt',
        'C:/Users/hardik/OneDrive - Capgemini/Desktop/Java Practice Material 1/Selenium_Q&A.pdf'])
    //Upload button
    const multipleUploadButton = await page.getByRole("button",{name:"Upload Multiple Files"})
    await multipleUploadButton.click()

    await expect.soft(page.locator("#multipleFilesStatus")).toContainText("notes.txt")
    await page.waitForTimeout(1000)
    await expect.soft(page.locator("#multipleFilesStatus")).toContainText("Selenium_Q&A.pdf")
    await page.waitForTimeout(1000)




    //Removing Files
    await page.locator("#multipleFilesInput").setInputFiles([])
    await multipleUploadButton.click()
    await page.waitForTimeout(1000)

    await expect.soft(page.locator("#multipleFilesStatus")).toHaveText("No files selected.")
    await page.waitForTimeout(2000)
})

