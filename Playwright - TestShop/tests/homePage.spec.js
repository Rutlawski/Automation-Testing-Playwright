import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { titles } from "../lib/titles";

test("Opens homepage and verifies page title", async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await expect(page).toHaveTitle(titles.HomePageTitle);
})