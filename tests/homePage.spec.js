const { default: test, expect } = require("@playwright/test");
import { ProductPage } from "../pages/ProductPage";

test.skip("Opens homepage and verifies", async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.openHomepage();
    await expect(page).toHaveTitle("Art Shopping Store");
})