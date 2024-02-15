import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { Homepage } from "../pages/Homepage";
import { RegisterPage } from "../pages/RegisterPage";

test("Registers a user and verifies page title", async ({page}) => {
    const homepage = new Homepage(page);
    const registerPage = new RegisterPage(page);
    const email = uuid() + "@gmail.com";
    const password = uuid();
    await homepage.openHomepage();
    await homepage.clickOnNavigationTab(0);
    await registerPage.clickOnRegisterButton();
    await registerPage.fillUpCredentialInputs(email, password);
    await registerPage.clickOnSignUpButton();
    await expect(page).toHaveURL('/my-account');
})