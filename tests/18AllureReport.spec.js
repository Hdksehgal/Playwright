import { test, expect } from "@playwright/test";
/*
Allure Reports for Playwright (Steps) 
==============================
1) Installation of "allure-playwright"  module  
	npm i -D @playwright/test allure-playwright

2) Installing Allure command line
	For Windows:   npm install -g allure-commandline --save-dev
			(or)
	For Mac:     sudo npm install -g allure-commandline --save-dev

3) add entry in "playwright.config.js" file
	reporter= ['allure-playwright',{outputFolder: 'my-allure-results'}]

4) Run the tests
 	npx playwright test tests/Reporters.spec.js

5) Generate Allure Report:
	allure generate my-allure-results -o allure-report --clean
   :my-allure-results = Source folder which contains files that'll be used to generate the final allure report
   :allure-report = Target Folder name containing the final report

6) Open Allure Report:
	allure open allure-report
*/

test("test 1", async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/")
    expect(page).toHaveTitle("OrangeHRM")
})

test("test 2", async({page})=>{
    await page.goto("https://orangehrm.com/")
    expect(page).toHaveTitle("OrangeHRM: All in One HR Software for Businesses | OrangeHRM")
})

test("test 3", async({page})=>{
    await page.goto("https://demoqa.com/")
    expect(page).toHaveTitle("demosit")
})