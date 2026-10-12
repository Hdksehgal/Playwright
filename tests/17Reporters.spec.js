import {test, expect} from "@playwright/test"

/*
List Reporter:
-> if we want a list report we can use the below command
npx playwright test --reporter=list
OR
-> we can go to playwright.config.js file and change the 
reporter: 'html' value to reporter: 'list'
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

/*
List reporter is default (except on CI where the dot reporter is default). It prints a line for each test being run.

Line reporter*************************************************
->Line reporter is more concise than the list reporter. It uses a single 
line to report last finished test, and prints failures when they occur. 
Line reporter is useful for large test suites where it shows the progress 
but does not spam the output by listing all the tests.
:npx playwright test --reporter=list
OR
-> we can go to playwright.config.js file and change the 
reporter: 'html' value to reporter: 'line'

Dot reporter*************************************************
Dot reporter is very concise - it only produces a single 
character per successful test run. It is the default on CI and
useful where you don't want a lot of output.

:npx playwright test --reporter=dot
OR
-> we can go to playwright.config.js file and change the 
reporter: 'html' value to reporter: 'dot'

HTML reporter********************************************************
HTML reporter produces a self-contained folder that contains report for the test run that can be served as a web page.

npx playwright test --reporter=html

By default, HTML report is opened automatically if some of the tests failed. You can control this behavior via the open property in the Playwright config or the PLAYWRIGHT_HTML_OPEN environmental variable. The possible values for that property are always, never and on-failure (default).

You can also configure host and port that are used to serve the HTML report.

playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]],
});

By default, report is written into the playwright-report folder in the current working directory. One can override that location using the PLAYWRIGHT_HTML_OUTPUT_DIR environment variable or a reporter configuration.

In configuration file, pass options directly:

playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'my-report' }]],
});

If you are uploading attachments from a data folder to another location, you can use attachmentsBaseURL option to let html report know where to look for them.

playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { attachmentsBaseURL: 'https://external-storage.com/' }]],
});
*/

/*
🎯 What is a Reporter?

A Reporter is a mechanism that tells Playwright:

"How should I display or save the test execution results?"

When you run:

Shell
npx playwright test
Show more lines

Playwright executes tests and produces results.

A reporter determines:

How results are displayed
Whether a report file is generated
Whether a dashboard/UI is available
Whether CI/CD tools can consume the results
Simple Analogy

Imagine you write an exam.

The exam result can be shown as:

Console Report
Plain Text
Math: Pass
Science: Pass
English: Fail
Show more lines
Excel Report
Plain Text
Student | Subject | Result
Show more lines
Beautiful Dashboard
Plain Text
Pass: 85
Fail: 15
Charts & Trends
Show more lines

All three show the same information but in different formats.

That is exactly what reporters do.

How to Configure Reporters

In playwright.config.js

JavaScript
module.exports = {
reporter: 'html'
};
Show more lines

or

JavaScript
module.exports = {
reporter: [
['html'],
['list']
]
};
Show more lines
1. LIST REPORTER
Configuration
JavaScript
reporter: 'list'
Show more lines
Output
Plain Text
Running 3 tests
 
✓ Login Test
✓ Search Test
✘ Registration Test
 
2 passed
1 failed
Show more lines
When to Use

✅ Local execution

✅ Daily development

✅ Debugging

Advantages
Clean output
Easy to read
Shows live execution
Disadvantages
No beautiful report
No screenshots
No dashboard
2. LINE REPORTER
Configuration
JavaScript
reporter: 'line'
Show more lines
Output
Plain Text
[1/50]
[2/50]
[3/50]
Show more lines

Continuously updates a single line.

When to Use

CI/CD pipelines

Jenkins

Azure DevOps

GitHub Actions

Advantages
Compact output
Saves console space
Disadvantages
Less detailed
Harder to debug locally
3. DOT REPORTER
Configuration
JavaScript
reporter: 'dot'
Show more lines
Output
Plain Text
......F.....
``
Show more lines

Legend:

Plain Text
. = Pass
F = Fail
Show more lines
Example
Plain Text
....F...
Show more lines

Means:

Plain Text
7 Passed
1 Failed
``
Show more lines
Usage

Large execution suites

1000+ test suites

Advantages

Very compact

Disadvantages

No detailed information

4. HTML REPORTER ⭐ MOST IMPORTANT

Probably the most commonly used Playwright reporter.

Configuration
JavaScript
reporter: 'html'
Show more lines
Execution
Shell
npx playwright test
Show more lines
Generate/Open Report
Shell
npx playwright show-report
Show more lines
UI

Beautiful browser-based dashboard.

Contains:

✅ Passed tests

✅ Failed tests

✅ Screenshots

✅ Videos

✅ Error logs

✅ Retry information

✅ Duration

Example Dashboard
Plain Text
-----------------------------------
Playwright Report
-----------------------------------
 
Passed : 120
Failed : 5
Skipped: 10
 
✓ Login Test
✓ Search Test
✘ Registration Test
Show more lines

Clicking a test shows:

Plain Text
Steps
Screenshots
Trace
Video
Errors
Show more lines
Usage

Most QA teams use this locally.

Most useful for debugging.

Advantages

✅ Beautiful UI

✅ Screenshots

✅ Videos

✅ Traces

✅ Easy to share

Disadvantages

Consumes storage

5. JSON REPORTER
Configuration
JavaScript
reporter: 'json'
Show more lines

Produces:

JSON
{
"tests": [
{
"title": "Login Test",
"status": "passed"
}
]
}
Show more lines
Usage

Integrations

Custom dashboards

Data processing

Analytics

Advantages

Machine-readable

Disadvantages

Human readability poor

6. JUNIT REPORTER ⭐ ENTERPRISE REPORTER
Configuration
JavaScript
reporter: 'junit'
Show more lines

Produces XML:

XML
<testsuite>
<testcase name="Login Test"/>
</testsuite>
Show more lines
Usage

Jenkins

Azure DevOps

GitHub Actions

TeamCity

CI Pipelines

Advantages

Industry standard

Disadvantages

Not visually attractive

7. GITHUB REPORTER
Configuration
JavaScript
reporter: 'github'
Show more lines
Usage

GitHub Actions

Output

Results appear directly in:

Plain Text
GitHub Workflow
Show more lines

instead of console only.

8. BLOB REPORTER
Configuration
JavaScript
reporter: 'blob'
Show more lines

Stores execution data in a compressed blob format.

Usage

Large enterprise suites

Parallel execution

Report merging

Useful when:

Plain Text
100 machines
1000 tests
Need merged report
Show more lines
Multiple Reporters Together ⭐ INDUSTRY PRACTICE

Most companies don't use just one reporter.

Example:

JavaScript
reporter: [
['list'],
['html'],
['junit']
]
``
Show more lines
Result
Console
Plain Text
Login Test Passed
Show more lines

via:

Plain Text
list
``
Show more lines
Dashboard
Plain Text
HTML Report
Show more lines

via:

Plain Text
html
Show more lines
CI/CD
Plain Text
XML Report
Show more lines

via:

Plain Text
junit
Show more lines
Real Enterprise Setup
JavaScript
reporter: [
['list'],
['html'],
['junit']
]
Show more lines

Why?

Developers

Use:

Plain Text
list
``
Show more lines
QA

Use:

Plain Text
html
Show more lines
Jenkins

Uses:

Plain Text
junit
Show more lines
Reporter Comparison
Reporter	Console UI	File Generated	Pretty UI	CI/CD
list	    ✅	❌	❌	❌
line	    ✅	  ❌	  ❌	  ✅
dot	        ✅	❌	❌	✅
html	    ✅	✅	✅   ✅	✅
json	    ❌	✅	❌	✅
junit	    ❌	✅	❌	✅✅✅
github	  ✅	❌	GitHub UI	✅
blob	    ❌	✅	❌	✅

What Companies Usually Use
Local Development
JavaScript
reporter: 'list'
Show more lines

or

JavaScript
reporter: 'html'
Show more lines
CI/CD
JavaScript
reporter: 'junit'
Show more lines
Enterprise Framework
JavaScript
reporter: [
['list'],
['html'],
['junit']
]
Show more lines
Interview Question
Which reporter do you use most?

A strong answer:

In day-to-day execution, I primarily use the HTML reporter because it provides a rich dashboard with test status, screenshots, videos, traces, and error details. For CI/CD integration, JUnit reporter is commonly used because Jenkins and Azure DevOps can easily consume XML results. During local execution, list reporter is useful for quick console feedback.

Quick Memory Trick
list → readable console
line → compact CI console
dot → minimal console output
html → beautiful dashboard ⭐
json → machine-readable
junit → Jenkins/Azure integration ⭐
github → GitHub Actions
blob → merge large distributed runs

For a Playwright automation engineer interview, focus most on HTML, JUnit, and List reporters, because those are the ones you'll use most often in real projects.
*/