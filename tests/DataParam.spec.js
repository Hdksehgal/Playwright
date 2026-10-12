import {test, expect} from '@playwright/test'
const SingleuserData = require('../Utils/DataParam.json')
const MultiuserData = require('../Utils/MultiDataParam.json')

test('Using Data Parameter',async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    const loginlink = page.getByRole("link",{name: 'Log in'})
    await loginlink.click()
    const emailbox = page.locator('#Email')
    await emailbox.fill(SingleuserData.username)
    const passbox = page.locator("#Password")
    await passbox.fill(SingleuserData.password)
})

for(let user of MultiuserData){
    test(`Multi User Parameter ${user.username}`,async({page})=>{
        // it is mandatory to add something dynamic in test title as we can't duplicate test titles
        // hence we are using ${} and back ticks `` in title
        await page.goto('https://demowebshop.tricentis.com/');
        const loginlink = page.getByRole("link",{name: 'Log in'})
        await loginlink.click()
        const emailbox = page.locator('#Email')
        await emailbox.fill(user.username)
        const passbox = page.locator("#Password")
        await passbox.fill(user.password)
        //it will run parallely
    })
}

/*
If we want to attach a screenshot in our report then 
we have to go to playwright.config.js add a parameter
screenshot: 'on' ; in 'use' section 

we can also go to test-results to check the screenshots attached with each test case

TRACE
Think of trace like a recording of what your test is doing.
👉 Imagine:

You click a button
Fill a form
Submit a request

Now imagine someone records everything step by step like a video + screenshots + logs.
That recording = ✅ Trace
✅ 'off'
👉 No recording at all

“I don’t want any history”


✅ 'on'
👉 Record everything for every test

“Record ALL actions every time”


✅ 'retain-on-failure'
👉 Record everything BUT keep only failed tests

“Only keep recordings of failed tests”


✅ 'on-first-retry' ⭐ (MOST USED)
👉 Record only when test is retried after failure

“If test fails → retry → record that run”

✔ Saves storage
✔ Used in real projects

✅ 'on-all-retries'
👉 Record every retry

“Every time test retries → record it”

Now what are retries it is not what you think like retrying the test-case by clicking on the run button or re-run
retry != re-run

we can set retry above/outside use{}
retries: 1,
Think of retries like giving a second chance to a test.
Sometimes tests fail because of:

Internet delay 🌐
Page loading slow ⏳
Temporary glitches ⚠️

But the application is actually fine.
👉 So instead of marking it failed immediately → Playwright gives it another chance.
If it fails all retries: the final result is failed
StatusMeaning
✅ passed: Passed in first attempt
⚠️ flaky: Failed once → passed on retry
❌ failed: Failed even after all retries


COMMANDS
npx playwright test DataParam --debug
-this '--debug' command opens an inspector and browser 
where we can execute each line of code step by step in browser for debug purposes

npx playwright test DataParam --ui
-this '--ui' command opens the tracer window where the testcases executes in front of us in trace environment

*/