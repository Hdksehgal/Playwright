const{test, expect} = require('@playwright/test');

//every function/command in playwright returns a Promise
//every test in playwright run in headless mode(without UI Opening browser)
//fixtures --> browser, context, page, browserName, request

//this test function returns an array of fixtures and ({page})=>{} is known as destructuring of the array
test('Basic Playwright demo',async ({page})=>{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://demowebshop.tricentis.com/")
    
    const email = page.locator('#Email')
    //# means id, id = 'Email'

    // a compound class name which have long class name with a big space in between in order to locate them
    // we can use partial name in class
    // const loginlink = page.getByRole('link', {name:'Login in'})
    const loginlink = page.locator('.ico-login')
    // await loginlink.click()

    const password = page.locator('#Password')
    const loginbtn = page.locator('.login-button')

    // await email.fill('john.xyz@gmail.com')
    // await password.fill('John@123')
    // await loginbtn.click()


    //two types of assertions: value based and page/locator based 

    //value based assertion
    // const emailVal = page.locator('.account').first()
    // const emailText = await emailVal.textContent()


    //page/locator based assertion
    // expect(emailText).toBe('john.xyz@gmail.com')
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/")
})

test('Register page form',async ({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html');


    const firstName = await page.getByPlaceholder("First Name")
    await firstName.fill("Hardik")

    const lastName = await page.getByPlaceholder("Last Name")
    await lastName.fill("Sehgal")

    const address = await page.locator("textarea[ng-model='Adress']")
    await address.fill("House No. 240, Old Housing Board, Rohtak, Haryana, 124001")

    const genderMale = await page.getByRole('radio', {name:"Male",exact: true})
    await genderMale.check()

    // const hobby1 = await page.getByRole('checkbox', {name: 'Cricket'})
    // this getbyrole is not working because label Cricket is not associated with the checkbox
    const hobby1 = await page.locator("#checkbox1")
    //alternates
    // await page.locator("input[type='checkbox'][value='Cricket']").check();
    await hobby1.check()

    const hobby2 = await page.locator("[value='Movies']")
    // if you write await page.locator("value='Movies'") it will not work
    await hobby2.check()

    //Select Language
    // const languages = await page.locator('#msdd')
    // await languages.click()
    // await page.getByRole('listitem',{hasText: 'Hindi'}).click()
    // // // await languages.selectOption({label: 'English'})

    const skills = await page.locator("#Skills")
    await skills.selectOption("C++")

    // Select Languages
    await page.locator('#msdd').click();
    await page.getByRole('listitem').filter({ hasText: 'English' }).click();
    await page.getByText('Hindi').click();
})