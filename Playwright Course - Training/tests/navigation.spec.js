import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test("Navigates through various tabs and verifies page's URL", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomepage();
    await homepage.clickOnNavigationTab(0);
    await expect(page).toHaveURL(/\/my-account/, { timeout: 3000 });
    await homepage.clickOnNavigationTab(1);
    await expect(page).toHaveURL('/');
    await homepage.clickOnNavigationTab(2);
    await expect(page).toHaveURL('/basket');
})