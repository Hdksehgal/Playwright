import {test, expect} from '@playwright/test'

/*
Terminal commands to run testcase having tags @reg and @sanity
:npx playwright test 14 --grep "@reg @sanity"
NOTE: the order in which the tags are written here is crucial it should exactly match the order in testcase title

Terminal commands to run testcase gaving tag @reg
npx playwright test 14 --grep "@reg"

Suppose you want everything except regression.
:npx playwright test 14 --grep-invert "@regression"

Command to execute all the testcases with tag @reg across different spec.js files
:npx playwright test --grep "@reg"
*/
 
test('Test1 @reg',async({page})=>{
console.log("t1")
})

test('Test2 @sanity',async({page})=>{
console.log("t2")
})

test('Test3 @reg @sanity',async({page})=>{
console.log("t3")
})

test('Test4 @reg @sanity',async({page})=>{
    console.log("t4")
})

//Alternate way to define tags
test ('Test 5', {tag: '@sanity'}, async({page})=>{
    console.log("t5")
})

test ('Test 6', {tag: ['@sanity','@reg']}, async({page})=>{
    console.log("t6")
})
