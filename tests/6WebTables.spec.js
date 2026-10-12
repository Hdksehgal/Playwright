import {test,expect} from "@playwright/test"

test("Web tables",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")
    const table = await page.locator("#productTable")

    //total number of rows and columns
    const columns = await table.locator("thead tr th")
    console.log("Number of columns in table: ",await columns.count())

    const rows = await table.locator("tbody tr")
    console.log("Number of rows: ",await rows.count())

    await expect(await columns.count()).toBe(4)
    await expect(await rows.count()).toBe(5)

    //select check for project 3
    const matchedrow = rows.filter({
        has: page.locator("td"),
        hasText: 'Tablet'
    })
    await matchedrow.locator('input').check()

    //printing the whole table
    // for(let i=0;i<await rows.count();i++){
    //     let row = rows.nth(i)
    //     for(let j=0;j<(await columns.count())-1;j++){
            
    //         // console.log(await row.locator("td").nth(j).textContent()+" ")
    //     }
    // }

    //printing table each page (pagination)
    const pageNum = page.locator(".pagination li a")
    for(let i=0;i<await rows.count();i++){
        if(i>0 && i<await pageNum.count()){
            await pageNum.nth(i).click()
            console.log("\nPage Number: ",i)
        }
        let row = rows.nth(i)
        for(let j=0;j<(await columns.count())-1;j++){
            
            console.log(await row.locator("td").nth(j).textContent()+" ")
        }
    }
})