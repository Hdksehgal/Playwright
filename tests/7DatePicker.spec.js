import {test,expect} from "@playwright/test"

test("Date Picker",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const datepicker1 = await page.locator("#datepicker")
    

    //1st way
    // await datepicker1.fill("05/22/1985")

    //2nd way
    let year = "2030"
    let month = "January"
    let date = "28"
    await datepicker1.click()
    let lastPressedPrev = true

    while(true){
        const currentMonth = await page.locator(".ui-datepicker-month").textContent()
        const currentYear = await page.locator(".ui-datepicker-year").textContent()
        if(currentYear === year && currentMonth === month)
            break;
        else if(parseInt(currentYear) > parseInt(year))
        {   
            await page.locator("[title='Prev']").click()
            lastPressedPrev = true
        }
        else if(parseInt(currentYear) < parseInt(year))
        {
            await page.locator("[title='Next']").click()
            lastPressedPrev = false
        }
        else{
            lastPressedPrev ? await page.locator("[title='Prev']").click() : await page.locator("[title='Next']").click() 
        }
    }

    console.log("CurrentMonth: "+await page.locator(".ui-datepicker-month").textContent()+" CurrentYear: "+await page.locator(".ui-datepicker-year").textContent())
    await page.locator(`[data-date='${date}']`).click()

    await page.waitForTimeout(3000)
})