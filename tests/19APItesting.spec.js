/*
Retries and Test Flakiness***********************
1) if the test case is PASSED no Retry is needed
2) if the test case is FAILED then it is Retried, Upon Retry it fails
3) if the test case is FAILED first then upon Retry it is PASSED then these type of test cases are called Flaky tests

we change the retries: in the use section in playwright.config.js
*/


import {test,expect} from "@playwright/test"
import { request } from "http";
var userid;
test("GET request",async({request})=>{
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log((await response.json()))
    expect(response.status()).toBe(200)
})

test("POST request",async({request})=>{
    const response = await request.post("https://reqres.in/api/users",{
        data:{"name": "pavan", "job": "trainer"},
        headers:{"Accept":"application/json"}
    })
    const jasoooon = await response.json()
    console.log(jasoooon)
    console.log(response.status())
    expect(response.status()).toBe(201)
    var userid = jasoooon.id
    console.log(userid)
})

test("PUT request",async({request})=>{
    const response = await request.post("https://reqres.in/api/users/"+userid,{
        data:{"name": "Hardik", "job": "CEO"},
        headers:{"Accept":"application/json"}
    })
    const jasoooon = await response.json()
    console.log(jasoooon)
    console.log(response.status())
    expect(response.status()).toBe(201)
})

test("DEL request",async({request})=>{
    const response = await request.delete("https://reqres.in/api/users/"+userid)
    expect(response.status()).toBe(204)
})
