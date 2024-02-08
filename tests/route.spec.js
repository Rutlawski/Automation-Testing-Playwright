import test, { expect } from "@playwright/test";
import { getLoginToken } from "../api-calls/getLoginToken";
import { MyAccountPage } from "../pages/MyAccountPage";
import { AdminDetails } from "../data/adminDetails";

test.only("Modififies the response", async ({page}) => {
    const loginToken = await getLoginToken(AdminDetails.username, AdminDetails.password);
    const expectedMessage = "{\"message\":\"I am error\"}";
    await page.route("http://localhost:2221/my-account", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "I am error"})
        })
    })
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.openMyAccountPage();
    await page.evaluate(([loginTokeninBrowser]) => {
        document.cookie = "token=" + loginTokeninBrowser
    }, [loginToken])
    await myAccountPage.openMyAccountPage();
    await expect(myAccountPage.errorMessage).toHaveText(expectedMessage);
})