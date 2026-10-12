const{test,expect} = require('@playwright/test');
test('drag n drop static ', async ({page})=>{
    page.goto("https://demo.automationtesting.in/Register.html")
    const interaction = page.getByRole('link',{name:'Interaction'})
    const dragNdrop = page.getByText('Drag and Drop')
    const staticc = page.getByRole('link',{name: 'Static'})

    await interaction.hover()
    await dragNdrop.hover()
    await staticc.click()


    //drag n drop
    const angular = page.locator('#angular')
    const selenium = page.getByRole('img').nth(3)
    const mongo = page.getByRole('img').nth(2)
    const dropArea = page.locator('#droparea')
    await angular.dragTo(dropArea)
    await selenium.dragTo(dropArea)
    await mongo.dragTo(dropArea)

    await dropArea.click({button: 'right'})
})

test('Dynamic Drag N Drop',async({page})=>{
    page.goto("https://demo.automationtesting.in/Register.html")
    const interaction = page.getByRole('link',{name:'Interaction'})
    const dragNdrop = page.getByText('Drag and Drop')
    const staticc = page.getByRole('link',{name: 'Dynamic'})

    await interaction.hover()
    await dragNdrop.hover()
    await staticc.click()

    const angular = page.locator('#angular')
    
    const dragBox = await angular.boundingBox();
    if (!dragBox) throw new Error('Draggable not visible');

    await page.mouse.move(
        dragBox.x + dragBox.width / 2,
        dragBox.y + dragBox.height / 2
    );
    
    const dropArea = page.locator('.dragged');
    await dropArea.waitFor({ state: 'visible' });

    // Move to drop area
    const dropBox = await dropArea.boundingBox();
    if (!dropBox) throw new Error('Drop area not visible');

    await page.mouse.move(
        dropBox.x + dropBox.width / 2,
        dropBox.y + dropBox.height / 2
    );

    await page.mouse.up()


    // const selenium = page.getByRole('img').nth(3)
    // const mongo = page.getByRole('img').nth(2)
    // // const dropArea = page.locator('.dragged')

    // angular.dr(await page.locator('.dragged'))
    // selenium.dragTo(dropArea)
    // mongo.dragTo(dropArea)
    
})

test("Mouse Actions",async({page})=>{
    //hover
    // await page.goto("https://demowebshop.tricentis.com/")
    // const computers = await page.locator(".top-menu li a:has-text('Computers')")
    // await computers.hover()

    //Right Click
    // await page.goto("https://www.stepcampus.in/playground")
    // const rightclick = await page.locator("button:has-text('Right Click')")
    // await rightclick.click({button:"right"})

    //Double Click
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")
    const doubleClick = await page.getByRole("button",{name:"Copy Text"})
    await doubleClick.dblclick()
    await expect(page.locator("#field2")).toHaveValue("Hello World!")

})

test('Keyboard Interactions',async({page})=>{
    await page.goto("https://demo.automationtesting.in/Register.html")
    const firstName = page.getByPlaceholder('First Name')
    const lastName = page.getByPlaceholder('Last Name')
    firstName.click()
    await page.waitForTimeout(2000)

    await page.keyboard.press('Shift+L')
    await page.keyboard.press('Shift+I')
    await page.keyboard.press('Shift+C')
    await page.keyboard.press('Shift+H')
    await page.keyboard.press('Shift+I')

    //select all
    await page.keyboard.press("Control+A")
    //Meta is same as Control 
    // await page.keyboard.press("Meta+A")

    //copy
    await page.keyboard.press("Control+C")

    //go to last name then paste
    await lastName.click()

    await page.keyboard.press("Control+V")
    await page.waitForTimeout(2000)
    await page.close()

})


test("Practice drag n drop", async({page})=>{
    await page.goto("https://www.stepcampus.in/playground")
    const dragElement = await page.locator("#draggable")
    const dropArea = await page.locator("#target-container")

    //Approach 1
    // await page.pause()
    // await dragElement.hover()
    // await page.mouse.down()

    // await dropArea.hover()
    // await page.mouse.up()

    //Approach 2
    await dragElement.dragTo(dropArea)
    await expect(page.getByText("Dropped!")).toBeVisible()

})
