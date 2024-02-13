import test, { expect } from "@playwright/test";
import { MyAccountPage } from "../pages/MyAccountPage";
import { adminDetails } from "../lib/adminDetails";
import { getLoginToken } from "../api-calls/getLoginToken";

test("Mocking network test", async ({page}) => {
    await page.route("**/api/user**", async (route, response) => {
        await route.fulfill({
            status: 500,
            contentType: "json/application",
            body: JSON.stringify({message: "A critical error has occured"})
        })
    })
    const myAccountPage = new MyAccountPage(page);
    const loginToken = await getLoginToken(adminDetails.email, adminDetails.password);
    await myAccountPage.openMyAccountPage();
    await page.evaluate((loginTokenInBrowser) => {
        document.cookie = "token= " + loginTokenInBrowser
    }, [loginToken]);   
    await myAccountPage.openMyAccountPage();
    await myAccountPage.errorMessage.waitFor();
})