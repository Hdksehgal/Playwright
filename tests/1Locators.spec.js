//two ways to import modules

// 1st way
// const {test,expect} = require('@playwright/test')

// 2nd way
import {test, expect} from '@playwright/test'

test('Locators', async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let RegisterLink = await page.getByRole("link",{name:"register"})
    RegisterLink.click()

    //clicking on male radio box
    // await page.click('id=gender-male')
    await page.locator("#gender-male").click()

    //input first name
    await page.locator("id=FirstName").fill("hardik")

    //input last name
    await page.fill("id=LastName","sehgal")

    //input email
    await page.fill("id=Email","Hard1@gmail.com")

    //input password
    await page.locator("id=Password").fill("hdk123#")

    //input confirm passsword
    await page.fill("id=ConfirmPassword","hdk123#")

    //click on register
    await page.click("id=register-button")

    //alternate way by locating through xpath
    // await page.click("//*[@id='register-button']")

    //assertion
    let RegiterConfirmation = await page.getByText("Your registration completed")
    await expect(RegiterConfirmation).toBeVisible()

    // await page.pause()
    //this testcase will fail now because the data we have submitted for registration is a one-time thing
})

test("Locating Multiple Web Elements",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/books")

    //Locating multiple web elements without error being thrown at the run time
    let links = await page.$$("a")

    for(const link of links){
        const linktext = await link.textContent();
        console.log(linktext)
    }
    
    let productheadings = await page.$$("//div[@class='product-grid']//h2//a")
    console.log(productheadings.length)

    for(const product of productheadings){
        const name = await product.textContent()
        console.log(name)
    }
})

/*
Ways to run a specific test in a spec.js file
1. Run a Specific Test Using --grep ✅ (Most Common)
Run only the test whose title matches:
npx playwright test --grep "Valid Login"
Or:
npx playwright test login.spec.js --grep "Valid Login"

2. Use test.only() ✅ (Very Popular During Development)
Modify your test:
test.only("Valid Login", async ({ page }) => {   // code});
Then run:
npx playwright test

Only that test will execute.

3. Run a Specific Spec File
If you want all tests from a file:
npx playwright test login.spec.js
Or with path:
npx playwright test tests/login.spec.js

4. Run by Line Number ✅ (Very Useful)
Suppose your test starts at line 25:
npx playwright test login.spec.js:25
Example:
npx playwright test tests/login.spec.js:25

Playwright will execute the test closest to that line.

5. Use describe.only()
Run an entire test suite:
test.describe.only("Login Tests", () => {   test("Valid Login", async ({ page }) => {   });   test("Invalid Login", async ({ page }) => {   });});
Execute:
npx playwright test
Only the tests inside that describe block will run.

6. Run Multiple Tests Using Grep
npx playwright test --grep "Login|Signup"
Runs tests whose titles contain either Login or Signup.

7. Run Tests Matching Exact Name
npx playwright test --grep "^Valid Login$"

^ = start
$ = end

This prevents partial matches.

8. Run Tests with Tags
test("Valid Login @smoke", async ({ page }) => {});
Run:
npx playwright test --grep "@smoke"

Commands You'll Use Most Often
Run one specific test by title
-npx playwright test --grep "Valid Login"

Run one specific test by file and title
-npx playwright test login.spec.js --grep "Valid Login"

Run one specific test by line number
-npx playwright test login.spec.js:25

Temporarily run only one test
-test.only(...)

For day-to-day Playwright automation work, the three most commonly used approaches are:
-test.only()
-npx playwright test --grep "Test Name"
-npx playwright test file.spec.js:lineNumber

These are the ones you'll use 95% of the time in real projects and interviews.
*/