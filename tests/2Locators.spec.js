/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/
import {test,expect} from "@playwright/test"

test("Built-in Locators", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.pause()

    //getByText
    let pageConfirmation = await page.getByText("Automation Testing Practice")
    await expect(pageConfirmation).toBeVisible()

    //getByRole
    let dynamicButton = await page.getByRole("button",{name:"start"})
    await dynamicButton.click()

    // //getByLabel
    // let address = await page.getByLabel("Address:")
    // console.log(address.textContent())

    //getByPlaceholder
    let name = await page.getByPlaceholder("Enter Name")
    await name.fill("Hardik Sehgal")

    //getByAltText
    await page.getByRole("link",{name:"PlaywrightPractice"}).click()
    let logo = await page.getByAltText("logo image")
    await expect(logo).toBeVisible()
    
    //getByTitle
    let homepage = await page.getByTitle("Home page link")
    await homepage.click()

    //getByTestId
    let editProfile = await page.getByTestId("edit-profile-btn")
    await editProfile.click()
})

