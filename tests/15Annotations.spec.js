const {test,expect} = require ("@playwright/test")

//only
test('test 1',async({page})=>{
    console.log("Only this test will be executed if we use only annotation")
})

//skip
test.skip('test 2',async({page})=>{
    console.log("This test will be skipped at the time of execution")
})

//conditional skipping
test('test 3',async({page,browserName})=>{
    console.log("This is test 3")
    if(browserName==="chromium"){
        test.skip()
    }
})

//Fixme
test('test 4',async({page,browserName})=>{
    console.log("This is test 3")
    test.fixme()
    /*
    Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the test.fixme() call.
    To declare a "fixme" test:
    test.fixme(title, body)
    test.fixme(title, details, body)

    To annotate test as "fixme" at runtime:
    test.fixme(condition, description)
    test.fixme(callback, description)
    test.fixme()
    */
})

test("test 5",async({page})=>{
    test.fail() //expected
    console.log("This is test 5")
    expect(1).toBe(1)//Actual

    //If both expected and actual fail then the testcase is passed
    //if there is a mismatch then we get a specific error
    //This annotation is mainly used for negative testing
})

//slow
test("Test 6",async({page})=>{
    test.slow()
    /*
    Marks a test as "slow". Slow test will be given triple the default timeout.
    Usually the default timeout is 30 seconds you can access this timeout in playwright.config.js outside the use{}
    Note that test.slow([condition, callback, description]) cannot be used in a beforeAll 
    or afterAll hook. Use test.setTimeout(timeout) instead.
    */
   await page.goto("https://opensource-demo.orangehrmlive.com/")
   console.log("This is test 6")

})

/*
*************************test.fixme()**********************
1. test.skip()
Example

test.skip('Login Test', async ({ page }) => {
// test steps
});

Result

SKIPPED


Playwright completely ignores it.

Real Use Cases
Environment-specific functionality

Suppose a feature exists only in Production:


test.skip(process.env.ENV !== 'PROD',
'Only available in PROD');

Feature temporarily unavailable

test.skip('Payment Test', async ({ page }) => {
// feature not deployed yet
});
 

Browser-specific exclusion

test.skip(browserName === 'firefox',
'Not supported on Firefox');
`

2. test.fixme()
Example

test.fixme('Forgot Password Test', async ({ page }) => {
// known failure
});

Result

FIXME


Playwright marks it as:


Test is expected to fail

Real Use Cases
Known application bug

Suppose developers already know:


BUG-1234
Forgot Password button broken


Then:


test.fixme('Forgot Password Test', async ({ page }) => {
// blocked by BUG-1234
});

Known automation issue

test.fixme('File Upload Test', async ({ page }) => {
// script currently broken
});

Why fixme() is More Meaningful Than skip()

Imagine a regression suite contains:


100 Tests


and 15 tests are failing because of known bugs.

Wrong Approach

test.skip(...)


Now nobody knows:


Why was it skipped?
Is there a bug?
Is it intentional?

Better Approach

test.fixme(...)


Now everyone knows:


This test should exist
It is currently broken
Someone must fix it
 

Example Comparison
Using Skip

test.skip('Registration Test', async ({ page }) => {
});
``


Translation:

Don't execute this test.

Using Fixme

test.fixme('Registration Test', async ({ page }) => {
});
 


Translation:

Registration test is expected to fail and needs fixing.

Conditional Skip

test.skip(
process.env.ENV === 'QA',
'Feature disabled in QA'
);


If environment is QA:


Test skipped


Otherwise:


Test runs

Conditional Fixme

test.fixme(
browserName === 'webkit',
'Known issue in WebKit'
);


Result:


Marked as broken only in WebKit
``

Inside the Test
Skip

test('My Test', async ({ page }) => {
 
test.skip(true, 'Skipping for now');
 
await page.goto('/');
});

Fixme

test('My Test', async ({ page }) => {
 
test.fixme(true, 'Known bug');
 
await page.goto('/');
});

Typical Enterprise Usage
Skip

Used when:

Feature not applicable
Environment restriction
Browser restriction
Test data unavailable

Example:


test.skip(browserName === 'firefox');
``

Interview Answer

test.skip() is used when a test should not be executed due to 
environmental, configuration, or applicability reasons. test.fixme() 
is used when a test is known to be broken because of an application 
defect or test issue and needs fixing. While both prevent execution, 
fixme() communicates technical debt and known failures, whereas skip() 
communicates intentional exclusion from execution.

Easy way to remember
skip() = "Don't run it."
fixme() = "Don't run it because it's broken and needs fixing." 🚀
*/

/*
*************************test.fail()****************************
magine you're a QA tester and you already know there's a bug in the application.

Example:

Login Test

Expected:

Plain Text
User enters valid credentials
↓
Login should succeed
Show more lines

Actual:

Plain Text
User enters valid credentials
↓
Application crashes ❌
Show more lines

You know the bug exists.

Now instead of marking the test as failed every day, you tell Playwright:

"I EXPECT this test to fail because there's a known bug."

That's exactly what test.fail() does.

🎯 What Does test.fail() Mean?

It tells Playwright:

Plain Text
This test is expected to FAIL.
Show more lines

If the test fails:

Plain Text
✅ Playwright considers it a SUCCESS
Show more lines

because failure was expected.

Real Life Analogy

Suppose your car is known to have a broken horn.

You test it:

Plain Text
Press horn
Expected → no sound
Show more lines

Since you already know it's broken:

Plain Text
No sound → Test Passed ✅
Show more lines

because that's what you expected.

How It Works
Example
JavaScript
import { test, expect } from '@playwright/test';
 
test.fail('Known Login Bug', async ({ page }) => {
 
await page.goto('https://example.com');
 
expect(1).toBe(2);
 
});
Show more lines
What Happens?

The assertion fails:

JavaScript
expect(1).toBe(2);
`
Show more lines

Normally:

Plain Text
❌ Test Failed
Show more lines

But because of:

JavaScript
test.fail()
Show more lines

Playwright says:

Plain Text
I expected failure
Show more lines

Result:

Plain Text
✅ Test Passed
Show more lines
The Interesting Part

Suppose developers fix the bug.

Now:

JavaScript
test.fail('Known Login Bug', async ({ page }) => {
 
expect(1).toBe(1);
 
});
Show more lines

The test actually passes.

But Playwright was expecting a failure.

Result:

Plain Text
❌ Test Failed
Show more lines

Playwright reports:

Plain Text
Expected to fail, but passed.
Show more lines

This helps you discover that the bug has been fixed and the annotation can be removed.

Comparison with Other Annotations
skip()
JavaScript
test.skip()
Show more lines

Meaning:

Plain Text
Don't run this test.
``
Show more lines

Result:

Plain Text
Skipped
Show more lines
fixme()
JavaScript
test.fixme()
Show more lines

Meaning:

Plain Text
Known problem.
Do not execute.
Show more lines

Result:

Plain Text
Skipped/Fixme
``
Show more lines
fail()
JavaScript
test.fail()
Show more lines

Meaning:

Plain Text
Run the test.
Expect it to fail.
``
Show more lines

Result:

Plain Text
If it fails → Passed ✅
If it passes → Failed ❌
``
Show more lines
Visual Understanding
Normal Test
Plain Text
Expected = Pass
Actual = Pass
 
✅ Passed
Show more lines
test.fail()
Plain Text
Expected = Fail
Actual = Fail
 
✅ Passed
Show more lines
test.fail() after bug fix
Plain Text
Expected = Fail
Actual = Pass
 
❌ Failed
Show more lines

because Playwright expected a failure.

Real Project Scenario

Suppose Jira defect:

Plain Text
BUG-1234
 
Profile page crashes when uploading image
Show more lines

You still want the test in your suite.

JavaScript
test.fail('BUG-1234 Upload Profile Picture', async ({ page }) => {
 
// upload image
 
});
Show more lines

Benefits:

Test still executes
Bug remains visible
Reports remain meaningful
Once fixed, Playwright immediately alerts you
Conditional test.fail()

Suppose bug exists only in Firefox.

JavaScript
test('Upload File', async ({ page, browserName }) => {
 
test.fail(browserName === 'firefox',
'Known Firefox issue');
 
});
Show more lines
Results

Chrome:

Plain Text
Expected → Pass
Show more lines

Firefox:

Plain Text
Expected → Fail
Show more lines

Very useful for cross-browser testing.

Inside a Test
JavaScript
test('Login Test', async ({ page }) => {
 
test.fail(true, 'Known defect BUG-789');
 
await expect(page.locator('#welcome'))
.toBeVisible();
});
Show more lines
Enterprise Usage

Use test.fail() when:

✅ Known application bug exists

✅ Test should still execute

✅ Team wants visibility of bug

✅ Want automatic notification when bug gets fixed

When NOT to Use It

Do not use:

JavaScript
test.fail()
Show more lines

for:

Temporarily disabling tests
Environment issues
Missing test data

Use:

JavaScript
test.skip()
Show more lines

instead.

Quick Memory Trick
skip()
Plain Text
Don't run it
Show more lines
fixme()
Plain Text
Don't run it because it's broken
Show more lines
fail()
Plain Text
Run it and expect failure
Show more lines
Interview Answer

test.fail() is used when a test is expected to fail due to a known defect.
Unlike skip() or fixme(), Playwright still executes the test. If the test fails, 
Playwright marks it as passed because the failure was expected. If the test 
unexpectedly passes, Playwright marks it as failed, indicating that the known issue may 
have been fixed and the annotation should be reviewed.
*/