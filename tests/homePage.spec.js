import test, { expect } from "@playwright/test"
import { Homepage } from "../pages/Homepage"

test.skip("Opens Homepage and verifies URL and Title", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomePage();
    await page.waitForURL("http://localhost:2221/");
    await expect(page).toHaveTitle("Art Shopping Store");
})