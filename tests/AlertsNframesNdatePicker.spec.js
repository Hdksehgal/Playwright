const {test,expect} = require("@playwright/test")

test('Window Switching',async({page}) => {
    await page.goto("https://demo.automationtesting.in/Windows.html")
    const newTabButton = page.getByRole('button',{name: 'click'})
    // await newTabButton.click()
    const [newPage] = await Promise.all([page.waitForEvent('popup'),newTabButton.click()])

    console.log("new page URL" + newPage.url)
    console.log('new page title: '+ await newPage.title())
    const registerNow = newPage.getByRole('link',{name: 'Register now!'})
    const [registerPage] = await Promise.all([newPage.waitForEvent('popup'),registerNow.click()])
    
    const menubutton = registerPage.getByRole('button',{name: 'menu'})
    await menubutton.click()
})

test('Frames',async({page})=>{
    await page.goto("https://demo.automationtesting.in/Frames.html")
    const frame = page.frameLocator('#singleframe')
    //frame locator will help you only with id only if you want to locate with name you have to use page.frame()
    const frameinput = frame.getByRole('textbox')
    await frameinput.fill("Hardik Sehgal")
})

test("Frames 2.0",async({page})=>{
    
    await page.goto("https://ui.vision/demo/webtest/frames/")

    //total frames
    const allFramesOnThePage = await page.frames()
    console.log("Total frames: ",allFramesOnThePage.length)

    //Locating frames using url or name of frame
    //to get url of frame, go to frame element if src attribute is available then right click on it select "copy link address" and remove .html from last
    const frame2 = await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_2"})    
    await frame2.getByRole("textbox").fill("HelloHelllooo!!!")

    //if name attribute is available
    //const frame = await page.frame("name")

    const frame1 = await page.frameLocator("//frame[@src='frame_1.html']")
    await frame1.locator("[name='mytext1']").fill("Hnjii Aujlaa ni Aujlaaaa....")
})

test('iframe within an iframe',async({page})=>{
    await page.goto("https://demo.automationtesting.in/Frames.html")
    const multipleIframe = page.getByRole('link',{name:"Iframe with in an Iframe",exact:true})
    await multipleIframe.click()
    const frame1 = page.frameLocator("[src='MultipleFrames.html']");
    const frame2 = frame1.frameLocator("[src='SingleFrame.html']");
    const input =  frame2.getByRole('textbox')
    await input.fill("Hardik Sehgal")

})



test('Alerts',async({page})=>{
    //need to learn about alerts separately
    await page.goto("https://testautomationpractice.blogspot.com/")
    //before handling alerts in playwright we need write dialogue window handler
    /*page.on('dialog') listener must handle the dialog. 
    Otherwise your action will stall, be it locator.click() 
    or something else. That's because dialogs in Web are modals 
    and therefore block further page execution until they are handled.
     */
    //Here we enabling alert handler and we have to write this before triggering the alert
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert')
        console.log(dialog.message())
        await dialog.accept()
    })
    const simpleAlert = page.getByRole('button',{name:"Simple Alert"})
    await simpleAlert.click()
    await page.waitForTimeout(2000)
})

test("Confirmation Alert", async({page})=>{
    await page.goto("https://demo.automationtesting.in/Alerts.html")
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('confirm')
        console.log(dialog.message())
        await dialog.accept()
        // await dialog.dismiss()
    })
    const confirmationAlert = page.getByRole('button',{name:"Confirmation Alert"})
    await confirmationAlert.click()
    await page.waitForTimeout(2000)
})

test("Prompt ALert",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    // page.on('dialog',async dialog=>{
    //     expect(dialog.type()).toContain("prompt")
    //     console.log(dialog.type()+" AND "+dialog.message())
    //     await dialog.accept("Hardik Sehgal")
    // })
    const waiter = page.waitForEvent('dialog')
    const promptAlert = page.getByRole('button',{name:"Prompt Alert"})
    await promptAlert.click()
    const realhandler = await waiter
    await realhandler.accept("Shubham")
    await page.waitForTimeout(2000)
})

test("Date Picker", async({page})=>{
    await page.goto("https://demo.automationtesting.in/Alerts.html")
    const widgetOptions = page.getByRole('link',{name: 'Widgets'})
    await widgetOptions.hover()
    const datePickerOption = page.getByRole('link',{name:" Datepicker "})
    await datePickerOption.click()

    // const datepicker = page.locator(".imgdp")
    // await datepicker.click()

    // await page.getByText("28").click()
    const datepick = page.locator("#datepicker2")
    await datepick.fill("2002/01/28")
    

})