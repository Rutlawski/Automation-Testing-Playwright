import test, { expect } from "@playwright/test";
import { AdminDetails } from "../data/adminDetails"; 
import { MyAccountPage } from "../pages/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken"; 

test.skip("My Account page - cookie injection", async ({page}) => {
    const expectedText = "Email: admin";
    const loginToken = await getLoginToken(AdminDetails.username, AdminDetails.password);
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.openMyAccountPage();
    await page.evaluate(([loginTokeninBrowser]) => {
        document.cookie = "token=" + loginTokeninBrowser
    }, [loginToken])
    await myAccountPage.openMyAccountPage();
    await expect(myAccountPage.emailText).toHaveText(expectedText);
})