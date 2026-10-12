import {test,expect} from '@playwright/test'

 test.describe.only("Group 1",async()=>{
    test('Test1',async({page})=>{
    console.log("t1")
    })

    test('Test2',async({page})=>{
        console.log("t2")
    })

 })



test("Group 2",async()=>{
    test('Test3',async({page})=>{
    console.log("t3")
    })

    test('Test4',async({page})=>{
        console.log("t4")
    })

})

/*

We can execute a single group by adding .only in front of it
->test.describe.only()
or by skipping the group that we don't want to execute
->test.describe.skip()

*/

/*
1. Group Tests Using test.describe()

This is the most common method.

Example
JavaScript
1
import { test, expect } from '@playwright/test';
2
 
3
test.describe('Login Tests', () => {
4
 
5
test('Valid Login', async ({ page }) => {
6
// test steps
7
});
8
 
9
test('Invalid Login', async ({ page }) => {
10
// test steps
11
});
12
 
13
});
Show more lines
Benefits
Logically groups related tests.
Better report readability.
Can apply common settings.
Playwright Report
 
1
Login Tests
2
✓ Valid Login
3
✓ Invalid Login
Show more lines
Nested Groups
JavaScript
1
test.describe('Claims Module', () => {
2
 
3
test.describe('Create Claim', () => {
4
 
5
test('Individual Claim', async ({ page }) => {
6
});
7
 
8
test('Family Claim', async ({ page }) => {
9
});
10
 
11
});
12
 
13
});
Show more lines

Report:

 
1
Claims Module
2
Create Claim
3
✓ Individual Claim
4
 
5
✓ Family Claim
Show more lines
2. Group Tests Using Tags

This is the preferred method in large projects.

Example
JavaScript
1
test('Verify login @smoke', async ({ page }) => {
2
});
3
 
4
test('Verify logout @smoke', async ({ page }) => {
5
});
6
 
7
test('Verify claims @regression', async ({ page }) => {
8
});
Show more lines
Run Smoke Tests
Shell
1
npx playwright test --grep "@smoke"
Show more lines

Runs:

 
1
Verify login
2
Verify logout
Show more lines
Run Regression Tests
Shell
1
npx playwright test --grep "@regression"
Show more lines

Runs:

 
1
Verify claims
Show more lines
Multiple Tags
JavaScript
1
test('Verify Login @smoke @regression', async ({ page }) => {
2
});
Show more lines

This belongs to both groups.

Run
Shell
1
npx playwright test --grep "@smoke"
Show more lines

or

Shell
1
npx playwright test --grep "@regression"
Show more lines

Both will run this test.

3. Tag Through Test Details Object (Modern Approach)

Recommended in recent Playwright versions.

JavaScript
1
test(
2
'Verify Login',
3
{
4
tag: '@smoke'
5
},
6
async ({ page }) => {
7
 
8
}
9
);
10
``
Show more lines
Multiple Tags
JavaScript
1
test(
2
'Verify Login',
3
{
4
tag: ['@smoke', '@regression']
5
},
6
async ({ page }) => {
7
 
8
}
9
);
Show more lines
Run
Shell
1
npx playwright test --grep @smoke
2
``
Show more lines
4. Group Using File Structure

Very common in enterprise projects.

Folder Structure
 
1
tests
2
|
3
├── smoke
4
│ ├── login.spec.js
5
│ └── logout.spec.js
6
|
7
├── regression
8
│ ├── claims.spec.js
9
│ └── policy.spec.js
10
|
11
└── api
12
└── userApi.spec.js
Show more lines
Run Entire Smoke Folder
Shell
1
npx playwright test tests/smoke
Show more lines
Run Regression Folder
Shell
1
npx playwright test tests/regression
Show more lines
Run Single File
Shell
1
npx playwright test tests/smoke/login.spec.js
Show more lines
5. Group Using Projects

Used when the same tests must run under different configurations.

playwright.config.js
JavaScript
1
export default defineConfig({
2
 
3
projects: [
4
 
5
{
6
name: 'smoke'
7
},
8
 
9
{
10
name: 'regression'
11
}
12
 
13
]
14
 
15
});
Show more lines
Run Smoke Project
Shell
1
npx playwright test --project=smoke
Show more lines
Run Regression Project
Shell
1
npx playwright test --project=regression
Show more lines
Browser-Based Grouping
JavaScript
1
projects: [
2
{
3
name: 'chromium',
4
use: {
5
browserName: 'chromium'
6
}
7
},
8
{
9
name: 'firefox',
10
use: {
11
browserName: 'firefox'
12
}
13
}
14
]
Show more lines

Run:

Shell
1
npx playwright test --project=chromium
Show more lines
6. Group Using describe.configure()

Suppose all tests in a group should run serially.

JavaScript
1
test.describe('Payment Tests', () => {
2
 
3
test.describe.configure({
4
mode: 'serial'
5
});
6
 
7
test('Create Payment', async () => {
8
});
9
 
10
test('Update Payment', async () => {
11
});
12
 
13
});
Show more lines
Why?

Second test depends on first test.

Example:

 
1
Create User
2
Update User
3
Delete User
Show more lines

Need sequential execution.

Parallel Group
JavaScript
1
test.describe.configure({
2
mode: 'parallel'
3
});
Show more lines
All Tests Run Simultaneously
JavaScript
1
test.describe('Search Tests', () => {
2
 
3
test.describe.configure({
4
mode: 'parallel'
5
});
6
 
7
test('Search A', async () => {});
8
test('Search B', async () => {});
9
test('Search C', async () => {});
10
});
11
`
Show more lines
7. Group Using describe.only()

Run only one group.

JavaScript
1
test.describe.only('Login Tests', () => {
2
 
3
test('Login1', async () => {});
4
test('Login2', async () => {});
5
});
Show more lines

Everything else is ignored.

8. Skip Entire Group
JavaScript
1
test.describe.skip('Claims Tests', () => {
2
 
3
test('Create Claim', async () => {});
4
test('Update Claim', async () => {});
5
});
Show more lines

All tests are skipped.

9. Run Group Based on Test Name
JavaScript
1
test.describe('Login Tests', () => {
2
 
3
test('Valid Login', async () => {});
4
test('Invalid Login', async () => {});
5
});
Show more lines

Run:

Shell
1
npx playwright test --grep "Valid Login"
Show more lines
10. Run Multiple Groups Using Regex

Run Smoke + Sanity:

Shell
1
npx playwright test --grep "@smoke|@sanity"
Show more lines

Run Login + Claims:

Shell
1
npx playwright test --grep "Login|Claims"
Show more lines
11. Exclude Groups

Run everything except regression:

Shell
1
npx playwright test --grep-invert "@regression"
2
`
Show more lines

Run everything except smoke:

Shell
1
npx playwright test --grep-invert "@smoke"
Show more lines
Real Project Structure (Recommended)
 
1
tests
2
|
3
├── login
4
│ ├── login.spec.js
5
│
6
├── claims
7
│ ├── createClaim.spec.js
8
│ ├── updateClaim.spec.js
9
│
10
├── policy
11
│ ├── policy.spec.js
Show more lines

Example test:

JavaScript
1
test(
2
'Create Claim @smoke @regression',
3
async ({ page }) => {
4
 
5
}
6
);
Show more lines

Execution:

Shell
1
# Smoke Suite
2
npx playwright test --grep "@smoke"
3
 
4
# Regression Suite
5
npx playwright test --grep "@regression"
6
 
7
# Exclude Smoke
8
npx playwright test --grep-invert "@smoke"
9
 
10
# Single Folder
11
npx playwright test tests/claims
12
 
13
# Single File
14
npx playwright test createClaim.spec.js
15
 
16
# Single Test
17
npx playwright test --grep "Create Claim"
Show more lines
Interview Question Answer

Q: What are the different ways of grouping tests in Playwright?

You can group tests using:

test.describe()
Nested test.describe()
Tags (@smoke, @regression)
Test Details Object (tag)
Folder Structure
Projects in playwright.config.js
Serial and Parallel Groups using describe.configure()
describe.only()
describe.skip()
Running groups using --grep and --grep-invert
Recommended in Enterprise Frameworks

For large Playwright frameworks, the most common combination is:

Folder Structure
+
Tags (@smoke/@regression/@sanity)
+
test.describe()
Show more lines

because it gives the best organization, reporting, and execution flexibility.
*/
