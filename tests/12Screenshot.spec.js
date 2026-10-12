import {test,expect} from '@playwright/test'
import path from 'node:path';

test("Page screenshot",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/")
    await expect(page.getByAltText("company-branding")).toBeVisible()
    await page.screenshot({path: 'tests/Screenshots/'+Date.now()+'PageScreenshot.png'})
})

test("Full Page Screenshot",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/")
    await expect(page.getByAltText("company-branding")).toBeVisible({timeout:7000})
    await page.screenshot({path: 'tests/Screenshots/'+Date.now()+'FullPageScreenshot.png', fullPage:true})
    //if you look at the screenshots you won't find much difference between the Page screenshot and Full Page screenshot
    //the main difference is full page screenshot takes the screenshot of whole scrollable page
})

test.only("Element Screenshot",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/")
    await expect(page.getByAltText("company-branding")).toBeVisible({timeout:10000})
    // await page.pause()
    await page.getByText('Username : AdminPassword :').screenshot({path:'tests/Screenshots/'+Date.now()+'ElementScreenshot.png'})
})



/*
Option 1: Attach Screenshot to Playwright HTML Report
JavaScript
1
import { test } from '@playwright/test';
2
 
3
test('Search Test', async ({ page }, testInfo) => {
4
await page.goto('https://example.com');
5
 
6
await page.fill('#search', 'apple');
7
 
8
// Capture screenshot at this step
9
const screenshot = await page.screenshot();
10
 
11
await testInfo.attach('After Search Input', {
12
body: screenshot,
13
contentType: 'image/png'
14
});
15
 
16
// Continue test
17
await page.click('#searchButton');
18
});
Show more lines

When you open the Playwright report:


1
npx playwright show-report
Show more lines

You'll see "After Search Input" as an attachment under that test.

Option 2: Save Screenshot and Attach It
JavaScript
1
await page.screenshot({
2
path: 'test-results/search-input.png'
3
});
4
 
5
await testInfo.attach('Search Input Screenshot', {
6
path: 'test-results/search-input.png',
7
contentType: 'image/png'
8
});
Show more lines
Option 3: Use test.step() for Better Reporting

This creates a logical step in the report and attaches the screenshot to that step.

JavaScript
1
test('Autosuggestion test', async ({ page }, testInfo) => {
2
 
3
await test.step('Enter search text and verify suggestions', async () => {
4
 
5
await page.fill('#searchBox', 'app');
6
 
7
await page.locator('.suggestions').waitFor({
8
state: 'visible'
9
});
10
 
11
await testInfo.attach('Suggestions Visible', {
12
body: await page.screenshot(),
13
contentType: 'image/png'
14
});
15
});
16
 
17
});
Show more lines

In the HTML report, you'll see:

✓ Enter search text and verify suggestions
    📷 Suggestions Visible

Option 4: Screenshot of Only the Dropdown

If your goal is to capture an autosuggestion dropdown:

JavaScript
1
await page.locator('.suggestions').waitFor();
2
 
3
await testInfo.attach('Autosuggestion Dropdown', {
4
body: await page.locator('.suggestions').screenshot(),
5
contentType: 'image/png'
6
});
Show more lines

This is usually cleaner than taking a full-page screenshot.

Option 5: Using Playwright's Built-in Reporter Attachments

For frequent screenshots:

JavaScript
1
async function captureStep(page, testInfo, name) {
2
await testInfo.attach(name, {
3
body: await page.screenshot(),
4
contentType: 'image/png'
5
});
6
}
7
 
8
// Usage
9
await captureStep(page, testInfo, 'Before Submit');
10
await captureStep(page, testInfo, 'After Submit');
Show more lines
Example for Your Dropdown Debugging Scenario
JavaScript
1
test('Inspect Autosuggestions', async ({ page }, testInfo) => {
2
 
3
await page.goto('https://your-app.com');
4
 
5
await page.fill('#searchBox', 'app');
6
 
7
const dropdown = page.locator('.suggestion-dropdown');
8
 
9
await dropdown.waitFor({ state: 'visible' });
10
 
11
await testInfo.attach('Autosuggestion Displayed', {
12
body: await dropdown.screenshot(),
13
contentType: 'image/png'
14
});
15
 
16
});
Show more lines

Then run:


1
npx playwright test
2
npx playwright show-report
Show more lines

and the screenshot will be visible directly inside the Playwright HTML report for that specific execution step.

Provide your feedback on BizChat

*/