import test, { expect } from "@playwright/test";
import { MyAccountPage } from "../pages/MyAccountPage";
import { adminDetails } from "../lib/adminDetails";
import { getLoginToken } from "../api-calls/getLoginToken";

test("Cookie injection test", async ({page}) => {
    const myAccountPage = new MyAccountPage(page);
    const expectedText = "Email: admin";
    const loginToken = await getLoginToken(adminDetails.email, adminDetails.password);
    await myAccountPage.openMyAccountPage();
    await page.evaluate((loginTokenInBrowser) => {
        document.cookie = "token= " + loginTokenInBrowser
    }, [loginToken]);   
    await myAccountPage.openMyAccountPage();
    const actualText = await myAccountPage.emailText.innerText();
    await expect(actualText).toContain(expectedText);
})