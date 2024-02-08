const { default: test, expect } = require("@playwright/test");
import { ProductPage } from "../pages/ProductPage";

test.skip("Opens page and verifies text on Add Product button", async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.openHomepage();
    await expect(productPage.addButton).toHaveText("Add to Basket");
})