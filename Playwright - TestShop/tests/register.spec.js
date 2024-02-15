import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { RegisterPage } from "../pages/RegisterPage";
import { text } from "../lib/text";

test("Registers a user and verifies", async ({page}) => {
    const registerPage = new RegisterPage(page);
    const email = uuid() + "@gmail.com";
    const password = uuid();
    await registerPage.openRegisterPage();
    await page.waitForLoadState('networkidle');
    await registerPage.fillRegisterCredentails(email, password);
    await page.waitForLoadState('networkidle');
    await registerPage.clickRegisterButton();
    await registerPage.clickRegisterButton();
    const paragraphText = await registerPage.p.innerText();
    await expect(paragraphText).toContain(text.LoggedInMessage);
})