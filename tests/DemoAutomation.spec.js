const{test,expect} = require('@playwright/test');

test('Demo Automation',async ({page})=>{
    await page.goto("https://demo.automationtesting.in/Register.html")
    const firstname = page.locator("[ng-model = 'FirstName']")
    await firstname.fill("Hardik")
    const lastname = page.locator("[ng-model = 'LastName']")
    await lastname.fill("Sehgal")

    const cricket = page.locator('#checkbox1')
    await cricket.check()
    expect(await cricket.isChecked()).toBeTruthy()//expect that cricket should not be selected/checked
    
    //dropdown list
    //3 ways --> visible text, value field, index
    const skills = page.locator('#Skills')
    // await skills.selectOption('Android')//value field
    // await skills.selectOption({label:'Java'})//visible text
    await skills.selectOption({index:7})//index 

    //multi select dropdown
    const multiSelect = page.locator('#msdd')
    await multiSelect.click()

    const englishLang = page.getByText("English")
    await englishLang.click()
    await page.waitForTimeout(5000)

    const languageOptions = page.locator('.ui-corner-all')

    for(let i=0;i<4;i++){
        await languageOptions.nth(i).click()
    }
    //nth(i) is used instead of [i] only in playwright to access those elements
})