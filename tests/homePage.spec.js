import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { titles } from "../lib/titles";

test("Opens homepage and verifies title", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomepage();
    await expect(page).toHaveTitle(titles.homepageTitle);
})